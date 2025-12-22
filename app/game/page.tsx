"use client";

import ColorPicker from "@/components/game/colorPicker";
import { FeedbackIcons } from "@/components/game/FeedbackIcons";
import GuessRow from "@/components/game/guessRow";
import { generateSecretCode, validate } from "@/lib/game/engine";
import { MastermindColor, responsePosition } from "@/lib/game/types";
import { useEffect, useState } from "react";

export default function GameDashboard() {
  const [code, setCode] = useState<MastermindColor[]>(generateSecretCode());
  const [icons, setIcons] = useState<(responsePosition | null)[]>([null]);

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
  const handleSubmitAttempt = () => {
    const hasEmptyIndex = currentGuess.includes(null);
    if (hasEmptyIndex) {
      alert("Fill all the options");
      return;
    }
    //this force not to recibe nulls
    const finalGuess = currentGuess as MastermindColor[];
    console.log("validate");
    var as = validate(code, finalGuess);
    setIcons(as);
    console.log(as);
  };

  return (
    <div className="d-flex flex-column items-center gap-10 pt-5 mt-5">
      {/* 1. Active Guess Display */}
      <GuessRow
        currentGuess={currentGuess}
        handleRemoveColor={(e) => handleRemoveColor(e)}
      ></GuessRow>
      {icons && icons.length > 0 && <FeedbackIcons results={icons} />}{" "}
      {/* 2. Color Selection Palette */}
      <ColorPicker
        handleSelect={(e) => handleSelectColor(e)}
        currentGuess={currentGuess}
        submit={handleSubmitAttempt}
      ></ColorPicker>
    </div>
  );
}
