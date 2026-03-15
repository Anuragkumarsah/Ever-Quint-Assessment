import { useId } from "react";
import { TextInputProps } from "../../../types/ui";
import "./TextInput.css";

const TextInput = ({
  label,
  error,
  helperText,
  id,
  className = "",
  ...rest
}: TextInputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`text-input ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-input__label">
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`text-input__field ${error ? "text-input__field--error" : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />

      {error && (
        <p id={`${inputId}-error`} className="text-input__error" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="text-input__helper">{helperText}</p>
      )}
    </div>
  );
};

export default TextInput;
