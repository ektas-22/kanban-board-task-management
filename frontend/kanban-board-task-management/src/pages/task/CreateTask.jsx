import { useForm } from "react-hook-form";
import { createTask } from "../../services/TaskService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/createtask.css";

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

      toast.error(
        error.response?.data?.message || "Failed to create task"
      );
    }
  };

  return (
    <div className="create-task-page">
      <div className="create-task-card">

        <div className="create-task-header">
          <h1>Create Task</h1>
          <p>
            Add a new task to your Taskly board.
          </p>
        </div>

        <form
          className="create-task-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Title */}

          <div className="form-field">
            <label htmlFor="title">Task title</label>

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

            {errors.title && (
              <p className="form-error">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}

          <div className="form-field">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              rows="5"
              placeholder="Describe what needs to be done..."
              {...register("description", {
                maxLength: {
                  value: 500,
                  message:
                    "Description cannot exceed 500 characters",
                },
              })}
            />

            {errors.description && (
              <p className="form-error">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Actions */}

          <div className="create-task-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-task-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default CreateTask;