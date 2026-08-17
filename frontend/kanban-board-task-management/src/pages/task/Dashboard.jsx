import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/useAuth";
import {
  getTasks,
  deleteTask,
  updateTaskStatus,
} from "../../services/TaskService";

import KanbanBoard from "../../components/kanban/KanbanBoard";
import "../../assets/styles/userdashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  useEffect(() => {
    let ignore = false;

    const loadTasks = async () => {
      try {
        const response = await getTasks({
          page: 0,
          size: 10,
          sortBy: "createdAt",
          direction: "desc",
        });

        console.log("Tasks response:", response);

        if (!ignore) {
          setTasks(response.content || []);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);

        if (!ignore) {
          toast.error(error.response?.data?.message || "Failed to load tasks");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDelete = (taskId) => {
    setDeleteTaskId(taskId);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );

      toast.success("Task status updated successfully");
    } catch (error) {
      console.error("Error updating task status:", error);

      toast.error(
        error.response?.data?.message || "Failed to update task status",
      );
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };
  const confirmDelete = async () => {
    try {
      await deleteTask(deleteTaskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== deleteTaskId),
      );

      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);

      toast.error(error.response?.data?.message || "Failed to delete task");
    } finally {
      setDeleteTaskId(null);
    }
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">✓</div>

          <span>Taskly</span>
        </div>

        <div className="dashboard-header-actions">
          <span className="dashboard-header-link">Dashboard</span>

          <button className="dashboard-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="dashboard-content">
        {/* Welcome section */}
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">YOUR WORKSPACE</p>

            <h1>Welcome back 👋</h1>

            <p className="dashboard-subtitle">
              Organize your work and keep your tasks moving forward.
            </p>
          </div>

          <button
            className="dashboard-create-button"
            onClick={() => navigate("/tasks/create")}
          >
            <span>+</span>
            Create Task
          </button>
        </section>

        {/* Task summary */}
        <section className="dashboard-summary">
          <div className="dashboard-summary-card">
            <span className="dashboard-summary-label">Total Tasks</span>

            <strong>{tasks.length}</strong>
          </div>

          <div className="dashboard-summary-card">
            <span className="dashboard-summary-label">To Do</span>

            <strong>
              {tasks.filter((task) => task.status === "TODO").length}
            </strong>
          </div>

          <div className="dashboard-summary-card">
            <span className="dashboard-summary-label">In Progress</span>

            <strong>
              {tasks.filter((task) => task.status === "IN_PROGRESS").length}
            </strong>
          </div>

          <div className="dashboard-summary-card">
            <span className="dashboard-summary-label">Completed</span>

            <strong>
              {tasks.filter((task) => task.status === "DONE").length}
            </strong>
          </div>
        </section>

        {/* Kanban section */}
        {/* Kanban section */}
        <section className="dashboard-board-section">
          <div className="dashboard-board-header">
            <div>
              <h2>My Tasks</h2>

              <p>Drag and drop tasks to update their status.</p>
            </div>
          </div>

          {loading ? (
            <div className="dashboard-loading">
              <div className="dashboard-spinner"></div>

              <p>Loading your tasks...</p>
            </div>
          ) : (
            <KanbanBoard
              tasks={tasks}
              onDropTask={handleStatusChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          {deleteTaskId && (
            <div className="delete-modal-overlay">
              <div className="delete-modal">
                <div className="delete-modal-icon">!</div>

                <h2>Delete task?</h2>

                <p>
                  This task will be permanently deleted. This action cannot be
                  undone.
                </p>

                <div className="delete-modal-actions">
                  <button
                    type="button"
                    className="delete-cancel-button"
                    onClick={() => setDeleteTaskId(null)}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="delete-confirm-button"
                    onClick={confirmDelete}
                  >
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
