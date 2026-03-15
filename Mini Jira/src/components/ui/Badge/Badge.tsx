import { BadgeProps } from "../../../types/ui";
import "./Badge.css";

const Badge = ({ variant = "default", children }: BadgeProps) => {
  return <span className={`badge badge--${variant}`}>{children}</span>;
};

export default Badge;
