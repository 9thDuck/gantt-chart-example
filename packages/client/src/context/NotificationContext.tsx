import React, { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

interface NotificationContextType {
 showSuccess: (message: string) => void;
 showError: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
 undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
 children,
}) => {
 const showSuccess = (message: string) => toast.success(message);
 const showError = (message: string) => toast.error(message);

 return (
  <NotificationContext.Provider value={{ showSuccess, showError }}>
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
