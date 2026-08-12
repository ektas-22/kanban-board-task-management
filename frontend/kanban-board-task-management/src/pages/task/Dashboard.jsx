import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTasks } from "../../services/TaskService";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div>
      <h1>Task Dashboard</h1>
      <p>Welcome to your Kanban Task Management Dashboard.</p>
      <button onClick={() => navigate("/tasks/create")}>Create Task</button>
      <hr />
      <h2>My Tasks</h2>
      {loading && <p>Loading tasks...</p>}
      {!loading && tasks.length === 0 && <p>No tasks found.</p>}
      {!loading && tasks.length > 0 && (
        <div>
          {tasks.map((task) => (
            <div key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description || "No description"}</p>
              <p>
                Status: <strong>{task.status}</strong>
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
