"use client";

import ColorPicker from "@/components/game/colorPicker";
import { generateSecretCode } from "@/lib/game/engine";
import { MastermindColor } from "@/lib/game/types";
import { useState } from "react";

export default function GameDashboard() {
  console.log(generateSecretCode());

  // Inside your GameBoard component
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
    <div className="flex flex-col items-center gap-10 pt-5 mt-5">
      {/* 1. Active Guess Display */}
      <div className="flex gap-4 p-4 bg-slate-800 rounded-xl shadow-inner">
        {currentGuess.map((color, index) => (
          <button
            key={index}
            onClick={() => handleRemoveColor(index)}
            className={`w-14 h-14 rounded-full border-2 border-slate-600 transition-all
            ${
              color
                ? "scale-100 shadow-lg"
                : "scale-90 opacity-50 border-dashed"
            }
          `}
            style={{ backgroundColor: color?.toLowerCase() || "transparent" }}
          >
            {".   ."}{" "}
          </button>
        ))}
      </div>
      {/* 2. Color Selection Palette */}
      <ColorPicker
        handleSelect={(e) => handleSelectColor(e)}
        currentGuess={currentGuess}
      ></ColorPicker>
    </div>
  );
}
