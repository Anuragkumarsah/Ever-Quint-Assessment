import { CardProps } from "../../../types/ui";
import "./Card.css";

const Card = ({ children, className = "" }: CardProps) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
