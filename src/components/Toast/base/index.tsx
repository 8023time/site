import React, { useState, useEffect, useCallback } from "react";

interface ToastProps {
  id: number;
  type: "success" | "error" | "info";
  message: string;
  duration: number;
  onClose: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, duration, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      const removeTimer = setTimeout(() => onClose(id), 300); // 动画后销毁
      return () => clearTimeout(removeTimer);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={`mb-2 transform rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"}`}
    >
      {message}
    </div>
  );
};

// 用闭包方式避免全局变量时序问题
const subscribers: ((msg: string, type: ToastType, duration: number) => void)[] = [];

type ToastType = "success" | "error" | "info";

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: ToastType; duration: number }[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = "info", duration: number = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  // 注册订阅者，解决初始化时机问题
  useEffect(() => {
    subscribers.push(addToast);
    return () => {
      const i = subscribers.indexOf(addToast);
      if (i > -1) subscribers.splice(i, 1);
    };
  }, [addToast]);

  return (
    <div className="pointer-events-none fixed top-5 right-5 z-[9999] flex flex-col items-end">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};

// ✅ 全局 toast API（可在任意地方调用）
export const toast = {
  success: (msg: string, duration = 3000) => subscribers.forEach(fn => fn(msg, "success", duration)),
  error: (msg: string, duration = 3000) => subscribers.forEach(fn => fn(msg, "error", duration)),
  info: (msg: string, duration = 3000) => subscribers.forEach(fn => fn(msg, "info", duration)),
};
