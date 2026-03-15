import { Task } from "../../types/tasks";
import Card from "../ui/Card/Card";
import Badge from "../ui/Badge/Badge";
import { BadgeVariant } from "../../types/ui";
import "./TaskCard.css";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card className="task-card">
      <h3 className="task-card__title">{task.title}</h3>

      <div className="task-card__meta">
        <Badge variant={task.priority as BadgeVariant}>{task.priority}</Badge>

        {task.assignee && (
          <span className="task-card__assignee">{task.assignee}</span>
        )}
      </div>

      {task.tags.length > 0 && (
        <div className="task-card__tags">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
};

export default TaskCard;
