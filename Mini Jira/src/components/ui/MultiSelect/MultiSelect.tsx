import { useState, useRef, useEffect, useId } from "react";
import "./MultiSelect.css";

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

const MultiSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select options...",
  id,
  className = "",
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const selectId = id || generatedId;

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const selectedCount = value.length;
  let displayText = placeholder;
  if (selectedCount === 1) {
    const selectedOpt = options.find((opt) => opt.value === value[0]);
    if (selectedOpt) displayText = selectedOpt.label;
  } else if (selectedCount > 1) {
    displayText = `${selectedCount} selected`;
  }

  return (
    <div className={`multi-select ${className}`} ref={containerRef}>
      {label && (
        <label htmlFor={selectId} className="multi-select__label">
          {label}
        </label>
      )}
      
      <div 
        className={`multi-select__control ${isOpen ? "multi-select__control--open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        id={selectId}
      >
        <div className="multi-select__value">{displayText}</div>
        <svg 
          className="multi-select__chevron" 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {isOpen && (
        <div className="multi-select__menu" role="listbox" aria-multiselectable="true">
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <div 
                key={option.value}
                className="multi-select__option"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleOption(option.value);
                }}
                role="option"
                aria-selected={isSelected}
              >
                <div className={`multi-select__checkbox ${isSelected ? "multi-select__checkbox--checked" : ""}`}>
                  {isSelected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L4 7L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
