import { useId } from "react";
import { TextAreaProps } from "../../../types/ui";
import "./TextArea.css";

const TextArea = ({
  label,
  error,
  helperText,
  id,
  className = "",
  ...rest
}: TextAreaProps) => {
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div className={`textarea ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="textarea__label">
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        className={`textarea__field ${error ? "textarea__field--error" : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...rest}
      />

      {error && (
        <p id={`${textareaId}-error`} className="textarea__error" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && <p className="textarea__helper">{helperText}</p>}
    </div>
  );
};

export default TextArea;
