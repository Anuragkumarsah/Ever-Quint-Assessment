import React from "react";
import { Task } from "../../types/tasks";
import { StatusTypes } from "../../types/status";
import Card from "../ui/Card/Card";
import Badge from "../ui/Badge/Badge";
import Button from "../ui/Button/Button";
import { BadgeVariant } from "../../types/ui";
import "./TaskCard.css";

// SVG Icons
const PenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);


interface TaskCardProps {
  task: Task;
  onEdit?: () => void;
  onStatusChange?: (taskId: number, newStatus: StatusTypes) => void;
}

const TaskCard = React.memo(({ task, onEdit, onStatusChange }: TaskCardProps) => {
  return (
    <Card className="task-card">
      <div className="task-card__header">
        <h3 className="task-card__title" title={task.title}>{task.title}</h3>
        <div className="task-card__header-actions">
          <div className="task-card__status-wrapper">
            <select 
              className="task-card__status-select"
              value={task.status}
              onChange={(e) => onStatusChange?.(task.id, e.target.value as StatusTypes)}
              aria-label="Change Task Status"
            >
              <option value="backlog">Backlog</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <ChevronDownIcon />
          </div>

          {onEdit && (
            <Button variant="secondary" size="sm" onClick={onEdit} className="task-card__edit-btn" aria-label="Edit Task">
              <PenIcon />
            </Button>
          )}
        </div>
      </div>

      {task.description && (
        <p className="task-card__description" title={task.description}>
          {task.description}
        </p>
      )}

      <div className="task-card__meta">
        <div className="task-card__meta-item">
          <span className="task-card__label">Priority:</span>
          <Badge variant={task.priority as BadgeVariant}>{task.priority}</Badge>
        </div>

        {task.assignee && (
          <div className="task-card__meta-item task-card__assignee-wrapper">
            <UserIcon />
            <span className="task-card__assignee">{task.assignee}</span>
          </div>
        )}
      </div>

      {task.tags.length > 0 && (
        <div className="task-card__tags-container">
          <span className="task-card__label">Tags:</span>
          <div className="task-card__tags">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
});

export default TaskCard;
