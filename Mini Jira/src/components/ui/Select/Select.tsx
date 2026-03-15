import { useId } from "react";
import { SelectProps } from "../../../types/ui";
import "./Select.css";

const Select = ({
  label,
  options,
  id,
  className = "",
  ...rest
}: SelectProps) => {
  const generatedId = useId();
  const selectId = id || generatedId;

  return (
    <div className={`select ${className}`}>
      {label && (
        <label htmlFor={selectId} className="select__label">
          {label}
        </label>
      )}

      <select id={selectId} className="select__field" {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
