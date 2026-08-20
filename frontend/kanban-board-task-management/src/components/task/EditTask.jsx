import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  getTaskById,
  updateTask,
} from "../../services/taskService";
import "../../assets/styles/task/taskmodal.css";

function EditTask({
  taskId,
  onClose,
  onUpdated,
}) {
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const description = watch("description", "");

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
            error.response?.data?.message ||
              "Failed to fetch task data",
          );

          onClose();
        }
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
  }, [taskId, reset, onClose]);

  const onSubmit = async (data) => {
    try {
      await updateTask(taskId, data);

      toast.success("Task updated successfully");

      await onUpdated();
    } catch (error) {
      console.error("Error updating task:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update task",
      );
    }
  };

  return (
    <div className="task-modal-overlay" onMouseDown={onClose}>
      <div
        className="task-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {loading ? (
          <div className="task-modal-loading">
            <div className="task-modal-spinner"></div>

            <p>Loading task...</p>
          </div>
        ) : (
          <>
            <div className="task-modal-header">
              <div>
                <div className="task-modal-icon edit-icon">
                  ✎
                </div>
              </div>

              <div className="task-modal-heading">
                <h2>Edit Task</h2>

                <p>
                  Update the details of your Taskly task.
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
                <label htmlFor="edit-title">
                  Task title
                  <span>*</span>
                </label>

                <input
                  id="edit-title"
                  type="text"
                  placeholder="Enter task title"
                  className={
                    errors.title
                      ? "task-input-error"
                      : ""
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
                  <label htmlFor="edit-description">
                    Description
                  </label>

                  <span>
                    {description.length}/500
                  </span>
                </div>

                <textarea
                  id="edit-description"
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
                      Updating...
                    </>
                  ) : (
                    <>
                      <span>✓</span>
                      Update Task
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EditTask;