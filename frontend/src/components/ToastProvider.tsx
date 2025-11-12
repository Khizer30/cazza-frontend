// ToastProvider.tsx
import * as Toast from "@radix-ui/react-toast";
import { createContext, useContext, useState, type ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface ToastData {
  title: string;
  description?: string;
  type?: ToastType;
}

interface ToastContextType {
  showToast: (title: string, type?: ToastType, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [toastData, setToastData] = useState<ToastData | null>(null);

  const showToast = (
    title: string,
    type: ToastType = "info",
    description?: string
  ) => {
    setToastData({ title, description, type });
    setOpen(false);
    setTimeout(() => setOpen(true), 50); // trigger re-open
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={`rounded p-4 shadow-lg text-white ${
            toastData?.type === "success"
              ? "bg-green-600"
              : toastData?.type === "error"
              ? "bg-red-600"
              : "bg-gray-800"
          }`}
        >
          <Toast.Title className="font-semibold">
            {toastData?.title}
          </Toast.Title>
          {toastData?.description && (
            <Toast.Description>{toastData.description}</Toast.Description>
          )}
          <Toast.Close className="ml-4 text-sm underline cursor-pointer">
            Close
          </Toast.Close>
        </Toast.Root>

        <Toast.Viewport className="fixed bottom-4 right-4 w-96" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
