import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import KanbanColumn from "./KanbanColumn";

function KanbanBoard({ tasks, onDropTask, onEdit, onDelete }) {
  const todoTasks = tasks.filter((task) => task.status === "TODO");

  const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS");

  const doneTasks = tasks.filter((task) => task.status === "DONE");

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "flex-start",
        }}
      >
        <KanbanColumn
          title="To Do"
          status="TODO"
          tasks={todoTasks}
          onDropTask={onDropTask}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        <KanbanColumn
          title="In Progress"
          status="IN_PROGRESS"
          tasks={inProgressTasks}
          onDropTask={onDropTask}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        <KanbanColumn
          title="Done"
          status="DONE"
          tasks={doneTasks}
          onDropTask={onDropTask}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </DndProvider>
  );
}

export default KanbanBoard;
