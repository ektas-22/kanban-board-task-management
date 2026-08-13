import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTaskById, updateTask } from "../../services/taskService";

function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    let ignore = false;
    const loadTask = async () => {
      try {
        const task = await getTaskById(taskId);
        if (!ignore) {
          reset({
            title: task.title,
            description: task.description || "",
          });
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        if (!ignore) {
          toast.error(
            error.response?.data?.message || "Failed to fetch task data",
          );
        }
        navigate("/dashboard");
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };
    loadTask();
    return () => {
      ignore = true;
    };
  }, [taskId, reset, navigate]);
  const onSubmit = async (data) => {
    try {
      await updateTask(taskId, data);
      toast.success("Task updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };
  if (loading) {
    return <div>Loading Task...</div>;
  }
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div>
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
              maxLength: {
                value: 100,
                message: "Title must be at most 100 characters",
              },
            })}
          />

          {errors.title && <p>{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            placeholder="Enter task description"
            {...register("description", {
              maxLength: {
                value: 500,
                message: "Description cannot exceed 500 characters",
              },
            })}
          />

          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Task"}
        </button>

        <button type="button" onClick={() => navigate("/dashboard")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditTask;
