import { useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

const icons = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
};

const colors = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-yellow-500 text-black",
  info: "bg-blue-600",
};

const Toast = ({
  message,
  type = "success",
  show,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-50 animate-fade-in">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg text-white min-w-[320px] ${
          colors[type]
        }`}
      >
        {icons[type]}

        <p className="flex-1 text-sm font-medium">
          {message}
        </p>

        <button
          onClick={onClose}
          className="hover:opacity-80"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;