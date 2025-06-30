import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onDismiss: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle
};

const styles = {
  success: 'bg-green-50 border-green-200 text-green-700',
  error: 'bg-red-50 border-red-200 text-red-700',
  warning: 'bg-amber-50 border-amber-200 text-amber-700'
};

export function Toast({ type, message, onDismiss, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const Icon = icons[type];

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-2 p-4 border rounded-lg shadow-lg transition-all duration-300 animate-slide-in ${styles[type]}`}
      role="alert"
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm">{message}</p>
      <button
        onClick={onDismiss}
        className="ml-2 hover:opacity-75 transition-opacity"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}