import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Task } from "../../types/tasks";
import { StatusTypes } from "../../types/status";
import { updateTaskStatus } from "../../store/taskSlice";
import TaskCard from "../../components/task/TaskCard";
import TaskModal from "../../components/task/TaskModal";
import Button from "../../components/ui/Button/Button";
import "./Board.css";

const COLUMNS: { id: StatusTypes; title: string }[] = [
  { id: "backlog", title: "Backlog" },
  { id: "inProgress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const Board = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleStatusChange = (taskId: number, newStatus: StatusTypes) => {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  return (
    <div className="board-container">
      <header className="board-header">
        <h2 className="board-header__title">Team Workflow</h2>
        <Button variant="primary" onClick={handleCreateTask}>
          Create Task
        </Button>
      </header>

      <div className="board-columns">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id);

          return (
            <div key={column.id} className="board-column">
              <div className="board-column__header">
                <h3 className="board-column__title">{column.title}</h3>
                <span className="board-column__count">
                  {columnTasks.length}
                </span>
              </div>

              <div className="board-column__content">
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => handleEditTask(task)}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Board;
