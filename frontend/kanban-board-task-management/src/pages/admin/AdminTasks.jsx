import { useEffect, useState } from "react";
import {
  getAllTasks,
  getTaskById,
  deleteTask,
} from "../../services/adminService";
import { toast } from "react-toastify";

import "../../assets/styles/admin/admintask.css";

function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedTask, setSelectedTask] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const pageSize = 5;

  useEffect(() => {
    let ignore = false;

    const loadTasks = async () => {
      try {
        setLoading(true);

        const data = await getAllTasks(
          page,
          pageSize,
          "createdAt",
          "desc",
        );

        if (!ignore) {
          setTasks(data.content || []);
          setTotalPages(data.totalPages || 0);
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Error fetching admin tasks:",
          error,
        );

        if (!ignore) {
          toast.error(
            error.response?.data?.message ||
              "Failed to load tasks",
          );

          setLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      ignore = true;
    };
  }, [page]);

  const handleView = async (taskId) => {
    try {
      setDetailsLoading(true);

      const data = await getTaskById(taskId);

      setSelectedTask(data);
    } catch (error) {
      console.error(
        "Error fetching task details:",
        error,
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load task details",
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleDelete = (taskId) => {
    setDeleteTaskId(taskId);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(deleteTaskId);

      toast.success("Task deleted successfully");

      const data = await getAllTasks(
        page,
        pageSize,
        "createdAt",
        "desc",
      );

      setTasks(data.content || []);
      setTotalPages(data.totalPages || 0);

      if (
        data.content?.length === 0 &&
        page > 0
      ) {
        setPage((currentPage) => currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting task:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete task",
      );
    } finally {
      setDeleteTaskId(null);
    }
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
  };

  const getTaskStatusLabel = (status) => {
    switch (status) {
      case "TODO":
        return "To Do";

      case "IN_PROGRESS":
        return "In Progress";

      case "COMPLETED":
        return "Completed";

      default:
        return status || "Unknown";
    }
  };

  if (loading) {
    return (
      <div className="admin-tasks-loading">
        <div className="admin-tasks-spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="admin-tasks-page">
      <div className="admin-tasks-content">

        {/* =================================================
            PAGE HEADER
            ================================================= */}

        <section className="admin-tasks-header">
          <div>
            <p className="admin-tasks-eyebrow">
              ADMINISTRATION
            </p>

            <h1>Task management</h1>

            <p>
              Review and manage work across your
              Taskly workspace.
            </p>
          </div>

          <div className="admin-tasks-count">
            <strong>{tasks.length}</strong>

            <span>
              {tasks.length === 1
                ? "task"
                : "tasks"}{" "}
              shown
            </span>
          </div>
        </section>

        {/* =================================================
            TABLE
            ================================================= */}

        <section className="admin-tasks-section">
          {tasks.length === 0 ? (
            <div className="admin-tasks-empty">
              <div className="admin-tasks-empty-icon">
                ✓
              </div>

              <h2>No tasks found</h2>

              <p>
                There are currently no tasks to
                display.
              </p>
            </div>
          ) : (
            <div className="admin-tasks-table-card">
              <div className="admin-tasks-table-wrapper">
                <table className="admin-tasks-table">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th className="tasks-actions-heading">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id}>
                        <td>
                          <div className="task-title-cell">
                            <span>
                              {task.title}
                            </span>

                            <small>
                              #{task.id}
                            </small>
                          </div>
                        </td>

                        <td>
                          <span className="task-description">
                            {task.description ||
                              "No description"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`task-status task-status-${task.status?.toLowerCase()}`}
                          >
                            <span className="task-status-dot"></span>

                            {getTaskStatusLabel(
                              task.status,
                            )}
                          </span>
                        </td>

                        <td>
                          <div className="task-actions">
                            <button
                              type="button"
                              className="task-view-button"
                              onClick={() =>
                                handleView(task.id)
                              }
                            >
                              View
                            </button>

                            <button
                              type="button"
                              className="task-delete-button"
                              onClick={() =>
                                handleDelete(task.id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}

              <div className="admin-tasks-pagination">
                <button
                  type="button"
                  className="task-pagination-button"
                  onClick={() =>
                    setPage((prev) => prev - 1)
                  }
                  disabled={page === 0}
                >
                  ← Previous
                </button>

                <span className="task-pagination-info">
                  Page <strong>{page + 1}</strong>{" "}
                  of{" "}
                  <strong>{totalPages}</strong>
                </span>

                <button
                  type="button"
                  className="task-pagination-button"
                  onClick={() =>
                    setPage((prev) => prev + 1)
                  }
                  disabled={
                    page >= totalPages - 1
                  }
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* =================================================
          TASK DETAILS MODAL
          ================================================= */}

      {selectedTask && (
        <div
          className="admin-task-details-overlay"
          onClick={closeTaskDetails}
        >
          <div
            className="admin-task-details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="admin-task-details-close"
              onClick={closeTaskDetails}
              aria-label="Close"
            >
              ×
            </button>

            <div className="admin-task-details-icon">
              ✓
            </div>

            <h2>{selectedTask.title}</h2>

            <p className="admin-task-details-subtitle">
              Task details
            </p>

            {detailsLoading ? (
              <div className="admin-task-details-loading">
                <div className="admin-tasks-spinner"></div>

                <p>Loading details...</p>
              </div>
            ) : (
              <div className="admin-task-details-list">
                <div className="admin-task-detail-row">
                  <span>ID</span>

                  <strong>
                    #{selectedTask.id}
                  </strong>
                </div>

                <div className="admin-task-detail-row">
                  <span>Title</span>

                  <strong>
                    {selectedTask.title}
                  </strong>
                </div>

                <div className="admin-task-detail-row admin-task-detail-description">
                  <span>Description</span>

                  <strong>
                    {selectedTask.description ||
                      "No description"}
                  </strong>
                </div>

                <div className="admin-task-detail-row">
                  <span>Status</span>

                  <span
                    className={`task-status task-status-${selectedTask.status?.toLowerCase()}`}
                  >
                    <span className="task-status-dot"></span>

                    {getTaskStatusLabel(
                      selectedTask.status,
                    )}
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              className="admin-task-details-done-button"
              onClick={closeTaskDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* =================================================
          DELETE MODAL
          ================================================= */}

      {deleteTaskId && (
        <div className="admin-task-details-overlay">
          <div className="admin-task-delete-modal">
            <div className="admin-task-delete-icon">
              !
            </div>

            <h2>Delete task?</h2>

            <p>
              This task will be permanently deleted.
              This action cannot be undone.
            </p>

            <div className="admin-task-delete-actions">
              <button
                type="button"
                className="admin-task-delete-cancel"
                onClick={() =>
                  setDeleteTaskId(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-task-delete-confirm"
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

export default AdminTasks;