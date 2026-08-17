import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

import "../../assets/styles/kanbancolumn.css";

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
      className={`kanban-column ${isOver ? "kanban-column-over" : ""}`}
    >
      <div className={`kanban-column-header kanban-${status.toLowerCase()}`}>
        <h2>{title}</h2>

        <span className="kanban-column-count">{tasks.length}</span>
      </div>

      <div className="kanban-column-tasks">
        {tasks.length === 0 ? (
          <div className="kanban-empty-state">
            <p>Drop tasks here</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
