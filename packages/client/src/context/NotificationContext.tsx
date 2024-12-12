import React, { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

interface NotificationContextType {
 showSuccess: (message: string) => void;
 showError: (message: string) => void;
 showLoading: (message: string, id: string) => void;
 dismissLoading: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
 undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
 children,
}) => {
 const showSuccess = (message: string) => toast.success(message);
 const showError = (message: string) => toast.error(message);
 const showLoading = (message: string, id: string) =>
  toast.loading(message, { id });
 const dismissLoading = (id: string) => toast.dismiss(id);

 return (
  <NotificationContext.Provider
   value={{ showSuccess, showError, showLoading, dismissLoading }}
  >
   {children}
   <Toaster position="top-right" />
  </NotificationContext.Provider>
 );
};

export const useNotification = () => {
 const context = useContext(NotificationContext);
 if (!context) {
  throw new Error("useNotification must be used within a NotificationProvider");
 }
 return context;
};
