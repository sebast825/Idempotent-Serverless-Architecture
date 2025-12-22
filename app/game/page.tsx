"use client";

import AttemptRow from "@/components/game/attemptRow";
import ColorPicker from "@/components/game/colorPicker";
import GuessRow from "@/components/game/guessRow";
import { generateSecretCode, validate } from "@/lib/game/engine";
import { FeedbackStatus, MastermindColor } from "@/lib/game/types";
import {  useState } from "react";

export default function GameDashboard() {
  const [code, setCode] = useState<MastermindColor[]>(generateSecretCode());
  // Dentro de tu componente Game
  const [history, setHistory] = useState<
    {
      guess: MastermindColor[];
      results: FeedbackStatus[];
    }[]
  >([]);
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
    var validationResults = validate(code, finalGuess);
    setHistory([ ...history,{ guess: finalGuess, results: validationResults }]);

    setCurrentGuess(Array(4).fill(null));
  };

  return (
    <div className="d-flex flex-column items-center gap-10 pt-5 mt-5">
      <div className="game-history-container w-100 mt-4">
        {history.map((attempt, index) => (
          <AttemptRow
            key={history.length - index} 
            props={{
              attemptGuess: attempt.guess,
              results: attempt.results,
            }}
          />
        ))}
      </div>
      {/* 1. Active Guess Display */}
      <GuessRow
        currentGuess={currentGuess}
        handleRemoveColor={(e) => handleRemoveColor(e)}
      ></GuessRow>
      {/* 2. Color Selection Palette */}
      <ColorPicker
        handleSelect={(e) => handleSelectColor(e)}
        currentGuess={currentGuess}
        submit={handleSubmitAttempt}
      ></ColorPicker>
    </div>
  );
}
