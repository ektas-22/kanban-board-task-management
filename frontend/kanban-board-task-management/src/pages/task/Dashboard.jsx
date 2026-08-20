import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

import {
  getTasks,
  deleteTask,
  updateTaskStatus,
} from "../../services/TaskService";

import KanbanBoard from "../../components/kanban/KanbanBoard";
import CreateTask from "../../components/task/CreateTask";
import EditTask from "../../components/task/EditTask";

import "../../assets/styles/user/userdashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  /* =====================================================
     LOAD TASKS
     ===================================================== */

  const loadTasks = async () => {
    try {
      setLoading(true);

      const response = await getTasks({
        page: 0,
        size: 10,
        sortBy: "createdAt",
        direction: "desc",
      });

      setTasks(response.content || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);

      toast.error(
        error.response?.data?.message || "Failed to load tasks",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadInitialTasks = async () => {
      try {
        const response = await getTasks({
          page: 0,
          size: 10,
          sortBy: "createdAt",
          direction: "desc",
        });

        if (!ignore) {
          setTasks(response.content || []);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);

        if (!ignore) {
          toast.error(
            error.response?.data?.message || "Failed to load tasks",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadInitialTasks();

    return () => {
      ignore = true;
    };
  }, []);

  /* =====================================================
     LOGOUT
     ===================================================== */

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /* =====================================================
     UPDATE STATUS
     ===================================================== */

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTaskStatus(
        taskId,
        newStatus,
      );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId ? updatedTask : task,
        ),
      );

      toast.success("Task status updated successfully");
    } catch (error) {
      console.error(
        "Error updating task status:",
        error,
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update task status",
      );
    }
  };

  /* =====================================================
     EDIT
     ===================================================== */

  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
  };

  /* =====================================================
     DELETE
     ===================================================== */

  const handleDelete = (taskId) => {
    setDeleteTaskId(taskId);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(deleteTaskId);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== deleteTaskId,
        ),
      );

      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting task:",
        error,
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete task",
      );
    } finally {
      setDeleteTaskId(null);
    }
  };

  /* =====================================================
     SEARCH
     ===================================================== */

  const filteredTasks = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return tasks;
    }

    return tasks.filter((task) => {
      const title =
        task.title?.toLowerCase() || "";

      const description =
        task.description?.toLowerCase() || "";

      return (
        title.includes(value) ||
        description.includes(value)
      );
    });
  }, [tasks, searchTerm]);

  /* =====================================================
     SCROLL TO TASKS
     ===================================================== */

  const scrollToTasks = () => {
    document
      .getElementById("dashboard-tasks")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /* =====================================================
     UI
     ===================================================== */

  return (
    <div className="dashboard-page">

      {/* =================================================
          NAVBAR
          ================================================= */}

      <header className="dashboard-navbar">

        {/* Logo */}

        <button
          type="button"
          className="dashboard-navbar-logo"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <div className="dashboard-navbar-logo-icon">
            ✓
          </div>

          <span>Taskly</span>
        </button>

        {/* Navigation */}

        <nav className="dashboard-navbar-nav">

          <button
            type="button"
            className="dashboard-nav-link active"
            onClick={scrollToTasks}
          >
            Tasks
          </button>

        </nav>

        {/* Profile */}

        <div className="dashboard-navbar-profile">

          <button
            type="button"
            className="profile-button"
            onClick={() =>
              setShowProfileMenu(
                (current) => !current,
              )
            }
          >
            <div className="profile-avatar">
              U
            </div>

            <span>Profile</span>

            <span className="profile-arrow">
              {showProfileMenu ? "▲" : "▼"}
            </span>
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown">

              <button type="button">
                Profile
              </button>

              <button type="button">
                Settings
              </button>

              <div className="profile-dropdown-divider"></div>

              <button
                type="button"
                className="profile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </header>


      {/* =================================================
          MAIN CONTENT
          ================================================= */}

      <main className="dashboard-content">

        {/* =================================================
            COMPACT HERO
            ================================================= */}

        <section className="dashboard-hero">

          <div className="dashboard-hero-content">

            <h1>
              Work overview
            </h1>

            <p>
              Stay on top of what needs to be done.
            </p>

          </div>

          <button
            type="button"
            className="dashboard-create-button"
            onClick={() =>
              setShowCreateModal(true)
            }
          >
            <span>+</span>

            New Task
          </button>

        </section>


        {/* =================================================
            TASKS
            ================================================= */}

        <section
          className="dashboard-board-section"
          id="dashboard-tasks"
        >

          {/* Task Header */}

          <div className="dashboard-board-header">

            <div className="dashboard-board-title">

              <h2>
                Tasks
              </h2>

              <p>
                Drag tasks between columns to update
                their status.
              </p>

            </div>


            {/* Search */}

            <div className="dashboard-search">

              <span className="dashboard-search-icon">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value,
                  )
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  className="dashboard-search-clear"
                  onClick={() =>
                    setSearchTerm("")
                  }
                >
                  ×
                </button>
              )}

            </div>

          </div>


          {/* =================================================
              KANBAN
              ================================================= */}

          {loading ? (

            <div className="dashboard-loading">

              <div className="dashboard-spinner"></div>

              <p>
                Loading your tasks...
              </p>

            </div>

          ) : (

            <KanbanBoard
              tasks={filteredTasks}
              onDropTask={handleStatusChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          )}

        </section>

      </main>


      {/* =================================================
          CREATE TASK MODAL
          ================================================= */}

      {showCreateModal && (

        <CreateTask
          onClose={() =>
            setShowCreateModal(false)
          }

          onCreated={async () => {
            setShowCreateModal(false);

            await loadTasks();
          }}
        />

      )}


      {/* =================================================
          EDIT TASK MODAL
          ================================================= */}

      {editingTaskId && (

        <EditTask
          taskId={editingTaskId}

          onClose={() =>
            setEditingTaskId(null)
          }

          onUpdated={async () => {
            setEditingTaskId(null);

            await loadTasks();
          }}
        />

      )}


      {/* =================================================
          DELETE MODAL
          ================================================= */}

      {deleteTaskId && (

        <div className="delete-modal-overlay">

          <div className="delete-modal">

            <div className="delete-modal-icon">
              !
            </div>

            <h2>
              Delete task?
            </h2>

            <p>
              This task will be permanently deleted.
              This action cannot be undone.
            </p>

            <div className="delete-modal-actions">

              <button
                type="button"
                className="delete-cancel-button"
                onClick={() =>
                  setDeleteTaskId(null)
                }
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

    </div>
  );
}

export default Dashboard;