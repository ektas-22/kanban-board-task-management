import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createTask } from "../../services/taskService";
import "../../assets/styles/task/taskmodal.css";

function CreateTask({ onClose, onCreated }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const description = watch("description", "");

  const onSubmit = async (data) => {
    try {
      await createTask(data);

      toast.success("Task created successfully");

      await onCreated();
    } catch (error) {
      console.error("Error creating task:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create task",
      );
    }
  };

  return (
    <div className="task-modal-overlay" onMouseDown={onClose}>
      <div
        className="task-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="task-modal-header">
          <div>
            <div className="task-modal-icon create-icon">
              +
            </div>
          </div>

          <div className="task-modal-heading">
            <h2>Create Task</h2>

            <p>
              Add a new task to your Taskly board.
            </p>
          </div>

          <button
            type="button"
            className="task-modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form
          className="task-modal-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Title */}

          <div className="task-form-field">
            <label htmlFor="create-title">
              Task title
              <span>*</span>
            </label>

            <input
              id="create-title"
              type="text"
              placeholder="e.g. Design the landing page"
              className={
                errors.title ? "task-input-error" : ""
              }
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message:
                    "Title must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message:
                    "Title must be at most 100 characters",
                },
              })}
            />

            {errors.title && (
              <p className="task-form-error">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}

          <div className="task-form-field">
            <div className="task-form-label-row">
              <label htmlFor="create-description">
                Description
              </label>

              <span>
                {description.length}/500
              </span>
            </div>

            <textarea
              id="create-description"
              rows="5"
              placeholder="Describe what needs to be done..."
              className={
                errors.description
                  ? "task-input-error"
                  : ""
              }
              {...register("description", {
                maxLength: {
                  value: 500,
                  message:
                    "Description cannot exceed 500 characters",
                },
              })}
            />

            {errors.description && (
              <p className="task-form-error">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Actions */}

          <div className="task-modal-actions">
            <button
              type="button"
              className="task-modal-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="task-modal-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="task-button-spinner"></span>
                  Creating...
                </>
              ) : (
                <>
                  <span>+</span>
                  Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;