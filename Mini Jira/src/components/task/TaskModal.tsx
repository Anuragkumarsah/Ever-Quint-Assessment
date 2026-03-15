import { Task } from "../../types/tasks";
import { useAppDispatch } from "../../store/hooks";
import { addTask, updateTask } from "../../store/taskSlice";
import { useToast } from "../ui/Toast/ToastProvider";
import Modal from "../ui/Modal/Modal";
import TaskForm from "./TaskForm";
import "./TaskModal.css";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTask?: Task;
}

const TaskModal = ({ isOpen, onClose, editingTask }: TaskModalProps) => {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const handleSubmit = (taskData: Partial<Task>) => {
    const now = new Date().toISOString();

    if (editingTask) {
      // Edit mode
      dispatch(
        updateTask({
          ...(taskData as Task),
          id: editingTask.id,
          createdAt: editingTask.createdAt,
          updatedAt: now,
        }),
      );
      addToast("success", "Task updated successfully");
    } else {
      // Create mode
      const newTask: Task = {
        ...(taskData as Task),
        id: Date.now(),
        createdAt: now,
        updatedAt: now,
      };
      dispatch(addTask(newTask));
      addToast("success", "Task created successfully");
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingTask ? "Edit Task" : "Create Task"}
    >
      <div className="task-modal-content">
        {isOpen && (
          <TaskForm
            key={editingTask ? editingTask.id : "new"}
            initialTask={editingTask}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        )}
      </div>
    </Modal>
  );
};

export default TaskModal;
