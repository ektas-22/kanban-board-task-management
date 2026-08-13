import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

function KanbanColumn({ title, status, tasks, onDropTask, onEdit, onDelete }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",

    drop: (item) => {
      if (item.status !== status) {
        onDropTask(item.id, status);
      }
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        flex: 1,
        minHeight: "400px",
        padding: "15px",
        margin: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: isOver ? "#f0f0f0" : "#fafafa",
      }}
    >
      <h2>{title}</h2>

      {tasks.length === 0 && <p>Drop tasks here</p>}

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default KanbanColumn;
