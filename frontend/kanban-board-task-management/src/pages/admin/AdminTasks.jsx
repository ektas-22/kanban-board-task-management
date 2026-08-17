import { useEffect, useState } from "react";
import { getAllTasks, deleteTask } from "../../services/adminService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const pageSize = 5;

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getAllTasks(page, pageSize, "createdAt", "desc");

      console.log("Admin tasks response:", data);

      setTasks(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching admin tasks:", error);

      toast.error(error.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(taskId);

      toast.success("Task deleted successfully");

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);

      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div>
      <h1>Task Management</h1>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => navigate(`/admin/tasks/${task.id}`)}>
                    View
                  </button>

                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />

      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 0}>
        Previous
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page + 1} of {totalPages}
      </span>

      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page >= totalPages - 1}
      >
        Next
      </button>
    </div>
  );
}

export default AdminTasks;
