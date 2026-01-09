import {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";

type TooltipProviderProps = {
  children: React.ReactNode;
};

type TooltipState = {
  text: string;
  visible: boolean;
  x: number;
  y: number;
};

type TooltipContextType = {
  tooltip: TooltipState;
  showTooltip: (e: React.MouseEvent, text: string) => void;
  hideTooltip: () => void;
};

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    text: "",
    visible: false,
    x: 0,
    y: 0,
  });

  const timeoutRef = useRef<number | null>(null);
  const isActiveRef = useRef(false); // To track if tooltip is actively shown (passed initial delay)

  const showTooltip = useCallback((e: React.MouseEvent, text: string) => {
    const offset = 15;
    let x = e.clientX + offset;
    let y = e.clientY + offset;

    if (!isActiveRef.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        isActiveRef.current = true;
        setTooltip({ text, visible: true, x, y });
      }, 1000);
    } else {
      setTooltip({ text, visible: true, x, y });
    }
  }, []);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    isActiveRef.current = false; // Reset active state
    setTooltip({ text: "", visible: false, x: 0, y: 0 });
  }, []);

  return (
    <TooltipContext.Provider value={{ tooltip, showTooltip, hideTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (context === undefined) {
    throw new Error("useTooltip must be used within a TooltipProvider");
  }
  return context;
};
