import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Marquee } from "./data";

interface AppContextState {
  marquee: Marquee;
  savedEntries: string[];
  recentEntries: string[];
  menuOpen: boolean;
  generatingGif: boolean;
}

interface AppContextValue extends AppContextState {
  setMarquee: (marquee: Marquee) => void;
  updateMarquee: (field: keyof Marquee, value: any) => void;
  saveEntry: (entry: string) => void;
  logEntry: (entry: string) => void;
  removeEntry: (entry: string) => void;
  toggleMenu: () => void;
  toggleGeneratingGif: () => void;
}

const AppContext = createContext({} as AppContextValue);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppContextState>(DEFAULT_STATE);

  const saveEntry = useCallback((entry: string) => {
    setState((prev) => ({
      ...prev,
      savedEntries: [entry, ...prev.savedEntries.filter((v) => v !== entry)],
    }));
  }, []);

  const logEntry = useCallback((entry: string) => {
    setState((prev) => ({
      ...prev,
      recentEntries: [entry, ...prev.recentEntries.filter((v) => v !== entry)],
    }));
  }, []);

  const removeEntry = useCallback((entry: string) => {
    setState((prev) => ({
      ...prev,
      recentEntries: prev.recentEntries.filter((e) => e !== entry),
      savedEntries: prev.savedEntries.filter((e) => e !== entry),
    }));
  }, []);

  const setMarquee = useCallback((marquee: Marquee) => {
    setState((prev) => ({
      ...prev,
      marquee,
    }));
  }, []);

  const updateMarquee = useCallback((field: keyof Marquee, value: any) => {
    setState((prev) => ({
      ...prev,
      marquee: {
        ...prev.marquee,
        [field]: value,
      },
    }));
  }, []);

  const toggleMenu = useCallback(() => {
    setState((prev) => ({
      ...prev,
      menuOpen: !prev.menuOpen,
    }));
  }, []);

  const toggleGeneratingGif = useCallback(() => {
    setState((prev) => ({
      ...prev,
      generatingGif: !prev.generatingGif,
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem("marquee", JSON.stringify(state.marquee));
  }, [state.marquee]);

  useEffect(() => {
    localStorage.setItem("savedEntries", JSON.stringify(state.savedEntries));
  }, [state.savedEntries]);

  useEffect(() => {
    localStorage.setItem("recentEntries", JSON.stringify(state.recentEntries));
  }, [state.recentEntries]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setMarquee,
        updateMarquee,
        saveEntry,
        logEntry,
        removeEntry,
        toggleMenu,
        toggleGeneratingGif,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

export const FONT_FAMILY: Array<{ label: string; id: string }> = [
  { label: "昭源黑體", id: "Chiron Hei HK WS" },
  { label: "昭源宋體", id: "Chiron Sung HK WS" },
  { label: '"Noto Sans HK" sans-serif', id: '"Noto Sans HK" sans-serif' },
  {
    label: '"Noto Sans Lao Looped" sans-serif',
    id: '"Noto Sans Lao Looped" sans-serif',
  },
];

const DEFAULT_MARQUEE: Marquee = {
  text: "精力善用　自他共榮",
  color: "yellow",
  bgColor: "black",
  duration: 5,
  font: FONT_FAMILY[0].id,
};

export const parseUrlToMarquee = (url: string): Marquee => {
  const tokens = url.split("/").map((t) => decodeURIComponent(t));
  tokens.shift();
  if (tokens.length === 1) {
    return {
      ...DEFAULT_MARQUEE,
      text: tokens[0],
    };
  }
  if (tokens.length === 2) {
    return {
      ...DEFAULT_MARQUEE,
      duration: parseFloat(tokens[0]),
      text: tokens[1],
    };
  }
  if (tokens.length === 3) {
    return {
      ...DEFAULT_MARQUEE,
      duration: parseFloat(tokens[0]),
      color: tokens[1],
      text: tokens[2],
    };
  }
  if (tokens.length === 4) {
    return {
      ...DEFAULT_MARQUEE,
      duration: parseFloat(tokens[0]),
      color: tokens[1],
      bgColor: tokens[2],
      text: tokens[3],
    };
  }
  if (tokens.length === 5) {
    return {
      ...DEFAULT_MARQUEE,
      duration: parseFloat(tokens[0]),
      color: tokens[1],
      bgColor: tokens[2],
      font: tokens[3],
      text: tokens[4],
    };
  }
  return { ...DEFAULT_MARQUEE };
};

const DEFAULT_STATE: AppContextState = {
  marquee: JSON.parse(
    localStorage.getItem("marquee") ?? JSON.stringify(DEFAULT_MARQUEE),
  ),
  savedEntries: JSON.parse(localStorage.getItem("savedEntries") ?? "[]"),
  recentEntries: JSON.parse(localStorage.getItem("recentEntries") ?? "[]"),
  menuOpen: false,
  generatingGif: false,
};
