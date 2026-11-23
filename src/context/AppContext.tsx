import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

export interface CustomBouquet {
  title: string;
  lines: string[];
  price: number;
  image: string;
}

export interface OrderRequest {
  productId?: string;
  custom?: CustomBouquet;
  plan?: string;
  persona?: string;
}

interface AppContextValue {
  order: OrderRequest | null;
  openOrder: (request?: OrderRequest) => void;
  closeOrder: () => void;
  toast: string | null;
  showToast: (message: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderRequest | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const openOrder = useCallback((request: OrderRequest = {}) => setOrder(request), []);
  const closeOrder = useCallback(() => setOrder(null), []);
  const showToast = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const value = useMemo(
    () => ({ order, openOrder, closeOrder, toast, showToast }),
    [order, openOrder, closeOrder, toast, showToast]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
