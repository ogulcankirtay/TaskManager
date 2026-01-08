import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  show: () => void;
  hide: () => void;
  loading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const show = () => setLoadingCount((c) => c + 1);
  const hide = () => setLoadingCount((c) => Math.max(0, c - 1));

  return (
    <LoadingContext.Provider value={{ show, hide, loading: loadingCount > 0 }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within LoadingProvider");
  return context;
};
