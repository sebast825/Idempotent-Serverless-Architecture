import { MastermindColor } from "@/lib/game/types";
import { useState } from "react";

export const useCurrentGuess = () => {
  const [currentGuess, setCurrentGuess] = useState<(MastermindColor | null)[]>(
    Array(4).fill(null)
  );
  const handleSelectColor = (color: MastermindColor) => {
    const firstEmptyIndex = currentGuess.indexOf(null);
    if (firstEmptyIndex !== -1) {
      const newGuess = [...currentGuess];
      newGuess[firstEmptyIndex] = color;
      setCurrentGuess(newGuess);
    }
  };

  const handleRemoveColor = (index: number) => {
    const newGuess = [...currentGuess];
    newGuess[index] = null;
    setCurrentGuess(newGuess);
  };
  const clearCurrentGuess = () => {
    setCurrentGuess(Array(4).fill(null));
  };
  return {
    handleRemoveColor,
    handleSelectColor,
    currentGuess,
    clearCurrentGuess,
  };
};
