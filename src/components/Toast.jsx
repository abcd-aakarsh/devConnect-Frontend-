import React, { useEffect } from "react";

const Toast = ({ message, status, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="toast toast-top toast-center">
      <div
        className={`alert p-2! px-4! ${
          status === "success" ? "alert-success" : "alert-error"
        }`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
