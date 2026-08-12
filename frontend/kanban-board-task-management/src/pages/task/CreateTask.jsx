import { useForm } from "react-hook-form";
import { createTask } from "../../services/TaskService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await createTask(data);
      toast.success("Task created successfully");
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div>
      <h1> Create Task</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Task creation form fields */}
        {/* Title */}
        <div>
          <label htmlFor="title">Title</label>
          <input
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
        </div>
        {errors.title && <p>{errors.title.message}</p>}
        {/* Description */}
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Enter task description"
            {...register("description", {
              maxLength: {
                value: 500,
                message: "Description cannot exceed 500 characters",
              },
            })}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
        <button type="button" onClick={() => navigate("/dashboard")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
