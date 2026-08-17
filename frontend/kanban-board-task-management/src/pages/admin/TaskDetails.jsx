import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTaskById } from "../../services/adminService";

function AdminTaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(taskId);

        console.log("Admin task details:", data);

        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);

        toast.error(
          error.response?.data?.message || "Failed to load task details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) {
    return <p>Loading task details...</p>;
  }

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <div>
      <h1>Task Details</h1>

      <p>
        <strong>ID:</strong> {task.id}
      </p>

      <p>
        <strong>Title:</strong> {task.title}
      </p>

      <p>
        <strong>Description:</strong> {task.description}
      </p>

      <p>
        <strong>Status:</strong> {task.status}
      </p>

      <button onClick={() => navigate("/admin/tasks")}>Back to Tasks</button>
    </div>
  );
}

export default AdminTaskDetails;
