import { ButtonProps } from "../../../types/ui";
import "./Button.css";

const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) => {
  const classes = ["button", `button--${variant}`, `button--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
