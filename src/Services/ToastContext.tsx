import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Check2Circle,InfoCircleFill,ExclamationCircleFill,XCircleFill } from 'react-bootstrap-icons';
type ToastVariants = 'success' | 'danger' | 'warning' | 'info';
interface Toast {
  id: string;
  message: string;
  variant?: ToastVariants;
 
}

interface ToastContextType {
  addToast: (message: string, variant?: ToastVariants) => void;
  removeToast: (id: string) => void;
}

 export const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
  removeToast: () => {},
 })

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = ( message: string,variant: ToastVariants='success') => {
    const newToast: Toast = {
      id: Date.now().toString(),
      message,
      variant,
    };
    setToasts((prev) => [...prev, newToast]);

    // Automatically remove the toast after 5 seconds
    setTimeout(() => removeToast(newToast.id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };
  const getIcon = (variant: ToastVariants) => {
    switch (variant) {
      case 'success':
        return <Check2Circle style={{ marginRight: '8px', color: 'green' }} />;
      case 'danger':
        return <XCircleFill style={{ marginRight: '8px', color: 'red' }} />;
      case 'warning':
        return <ExclamationCircleFill style={{ marginRight: '8px', color: 'orange' }} />;
      case 'info':
      default:
        return <InfoCircleFill style={{ marginRight: '8px', color: 'blue' }} />;
    }
  };
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <ToastContainer position="top-end" className="p-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            bg={toast.variant}
            onClose={() => removeToast(toast.id)} // Manual removal on close
            
          ><Toast.Header> {getIcon(toast.variant!)} <strong className="me-auto">Thông Báo</strong></Toast.Header>
            <Toast.Body>
             
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

