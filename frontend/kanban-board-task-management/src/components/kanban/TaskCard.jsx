import { useDrag } from "react-dnd";

import "../../assets/styles/taskcard.css";

function TaskCard({ task, onEdit, onDelete }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",

    item: {
      id: task.id,
      status: task.status,
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`task-card ${
        isDragging ? "task-card-dragging" : ""
      }`}
    >
      <div className="task-card-content">

        <h3>{task.title}</h3>

        <p>
          {task.description || "No description"}
        </p>

      </div>

      <div className="task-card-footer">

        <span className="task-card-status">
          {task.status === "IN_PROGRESS"
            ? "In Progress"
            : task.status === "TODO"
              ? "To Do"
              : "Done"}
        </span>

        <div className="task-card-actions">

          <button
            type="button"
            className="task-edit-button"
            onClick={() => onEdit(task.id)}
          >
            Edit
          </button>

          <button
            type="button"
            className="task-delete-button"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default TaskCard;