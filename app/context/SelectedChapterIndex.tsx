import { createContext } from "react";

type selectedChapterContextType = {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const SelectedChapterContext = createContext<selectedChapterContextType>(
  {
    selectedIndex: 0,
    setSelectedIndex: () => {},
  }
);
