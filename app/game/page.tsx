"use client";

import ColorPicker from "@/components/game/colorPicker";
import GuessRow from "@/components/game/guessRow";
import { generateSecretCode } from "@/lib/game/engine";
import { MastermindColor } from "@/lib/game/types";
import { useState } from "react";

export default function GameDashboard() {
  console.log(generateSecretCode());

  const [currentGuess, setCurrentGuess] = useState<(MastermindColor | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const handleSelectColor = (color: MastermindColor) => {
    // Find the first index that is still null
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
  return (
    <div className="d-flex flex-column items-center gap-10 pt-5 mt-5">
      {/* 1. Active Guess Display */}
      <GuessRow
        currentGuess={currentGuess}
        handleRemoveColor={(e) => handleRemoveColor(e)}
      ></GuessRow>

      {/* 2. Color Selection Palette */}
      <ColorPicker
        handleSelect={(e) => handleSelectColor(e)}
        currentGuess={currentGuess}
      ></ColorPicker>
    </div>
  );
}
