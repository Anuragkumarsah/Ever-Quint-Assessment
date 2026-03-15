import { ToastItem } from "../../../types/ui";
import "./Toast.css";

interface ToastComponentProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const icons: Record<ToastItem["type"], string> = {
  success: "✓",
  error: "✕",
  info: "i",
};

const Toast = ({ toast, onDismiss }: ToastComponentProps) => {
  return (
    <div className={`toast toast--${toast.type}`} role="alert">
      <span className="toast__icon">{icons[toast.type]}</span>
      <p className="toast__message">{toast.message}</p>
      <button
        className="toast__dismiss"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
