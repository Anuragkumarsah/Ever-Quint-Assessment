/*-------Shared type definitions for the UI component library-------*/

import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";

/*-----Button-----*/

export type ButtonVariant = "primary" | "secondary" | "destructive";

/*-----ButtonSize-----*/

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/*-----TextInput-----*/

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/*-----TextArea-----*/

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/*-----Select-----*/

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

/*-----Badge-----*/

export type BadgeVariant = "low" | "medium" | "high" | "default";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

/*-----Card-----*/

export interface CardProps {
  children: ReactNode;
  className?: string;
}

/*-----Modal-----*/

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

/*-----Toast-----*/

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}
