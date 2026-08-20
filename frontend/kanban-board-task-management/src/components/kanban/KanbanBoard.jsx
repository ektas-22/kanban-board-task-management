import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./kanbanboard.css";

const columns = [
  {
    title: "To Do",
    status: "TODO",
  },
  {
    title: "In Progress",
    status: "IN_PROGRESS",
  },
  {
    title: "Done",
    status: "DONE",
  },
];

function KanbanBoard({ tasks, onDropTask, onEdit, onDelete }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks.filter(
              (task) => task.status === column.status,
            )}
            onDropTask={onDropTask}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DndProvider>
  );
}

function KanbanColumn({
  title,
  status,
  tasks,
  onDropTask,
  onEdit,
  onDelete,
}) {
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
      className={`kanban-column ${
        isOver ? "kanban-column-over" : ""
      }`}
    >
      <div
        className={`kanban-column-header kanban-${status.toLowerCase()}`}
      >
        <h2>{title}</h2>

        <span className="kanban-column-count">
          {tasks.length}
        </span>
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

  const statusLabel =
    task.status === "IN_PROGRESS"
      ? "In Progress"
      : task.status === "TODO"
        ? "To Do"
        : "Done";

  return (
    <div
      ref={drag}
      className={`task-card ${
        isDragging ? "task-card-dragging" : ""
      }`}
    >
      <div className="task-card-content">
        <h3>{task.title}</h3>

        <p>{task.description || "No description"}</p>
      </div>

      <div className="task-card-footer">
        <span className="task-card-status">
          {statusLabel}
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

export default KanbanBoard;