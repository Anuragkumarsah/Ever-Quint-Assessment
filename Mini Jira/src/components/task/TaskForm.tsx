import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { Task } from "../../types/tasks";
import { StatusTypes, Priority } from "../../types/status";
import TextInput from "../ui/TextInput/TextInput";
import TextArea from "../ui/TextArea/TextArea";
import Select from "../ui/Select/Select";
import Button from "../ui/Button/Button";
import "./TaskForm.css";

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Partial<Task>) => void;
  onCancel: () => void;
}

const TaskForm = ({ initialTask, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(
    initialTask?.description || "",
  );
  const [priority, setPriority] = useState<Priority>(
    initialTask?.priority || "medium",
  );
  const [status, setStatus] = useState<StatusTypes>(
    initialTask?.status || "backlog",
  );
  const [assignee, setAssignee] = useState(initialTask?.assignee || "");

  // We ask user to enter comma separated values. We store the raw string in state.
  const [tagsInput, setTagsInput] = useState(
    initialTask?.tags?.join(", ") || "",
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(
      title !== (initialTask?.title || "") ||
        description !== (initialTask?.description || "") ||
        priority !== (initialTask?.priority || "medium") ||
        status !== (initialTask?.status || "backlog") ||
        assignee !== (initialTask?.assignee || "") ||
        tagsInput !== (initialTask?.tags?.join(", ") || ""),
    );
  }, [title, description, priority, status, assignee, tagsInput, initialTask]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // client-side validation before saving
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!priority) newErrors.priority = "Priority is required";
    if (!status) newErrors.status = "Status is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const parsedTags = tagsInput
      .split(",")
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0);

    const taskData: Partial<Task> = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      assignee: assignee.trim(),
      tags: parsedTags,
    };

    onSubmit(taskData);
  };

  const handleCancel = () => {
    if (isDirty) {
      if (
        !window.confirm(
          "You have unsaved changes. Are you sure you want to leave?",
        )
      ) {
        return;
      }
    }
    onCancel();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <TextInput
        label="Title *"
        placeholder="Task title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        error={errors.title}
        autoFocus
      />

      <TextArea
        label="Description"
        placeholder="Task details"
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
        rows={4}
      />

      <div className="task-form__row">
        <Select
          label="Priority *"
          value={priority}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setPriority(e.target.value as Priority)
          }
          options={[
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ]}
        />

        <Select
          label="Status *"
          value={status}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setStatus(e.target.value as StatusTypes)
          }
          options={[
            { label: "Backlog", value: "backlog" },
            { label: "In Progress", value: "inProgress" },
            { label: "Done", value: "done" },
          ]}
        />
      </div>

      <TextInput
        label="Assignee"
        placeholder="e.g. John Doe"
        value={assignee}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAssignee(e.target.value)
        }
      />

      <TextInput
        label="Tags"
        placeholder="e.g. bug, frontend, urgent"
        value={tagsInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTagsInput(e.target.value)
        }
        helperText="Enter tags separated by commas"
      />

      <div className="task-form__actions">
        <Button type="button" variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialTask ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
