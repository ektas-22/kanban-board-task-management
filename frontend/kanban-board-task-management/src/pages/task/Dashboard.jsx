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

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

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

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      );

      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);

      toast.error(error.response?.data?.message || "Failed to delete task");
    }
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

  return (
    <div>
      <h1>Task Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <p>Welcome to your Kanban Task Management Dashboard.</p>

      <button onClick={() => navigate("/tasks/create")}>Create Task</button>

      <hr />

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <KanbanBoard
          tasks={tasks}
          onDropTask={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Dashboard;
