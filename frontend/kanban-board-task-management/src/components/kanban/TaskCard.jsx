import { useDrag } from "react-dnd";

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
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "10px",
        backgroundColor: "white",
        cursor: "grab",
      }}
    >
      <h3>{task.title}</h3>

      <p>{task.description || "No description"}</p>

      <p>
        Status: <strong>{task.status}</strong>
      </p>

      <button onClick={() => onEdit(task.id)}>Edit</button>

      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

export default TaskCard;
