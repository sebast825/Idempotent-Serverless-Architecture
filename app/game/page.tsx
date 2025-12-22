"use client";

import AttemptRow from "@/components/game/attemptRow";
import ColorPicker from "@/components/game/colorPicker";
import GameResultModal from "@/components/game/gameResultModal";
import GuessRow from "@/components/game/guessRow";
import { generateSecretCode, validate } from "@/lib/game/engine";
import { FeedbackStatus, GameStatus, MastermindColor } from "@/lib/game/types";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function GameDashboard() {
  const [code, setCode] = useState<MastermindColor[]>(generateSecretCode());
  const MAX_ATTEMPTS = 1;
  // Dentro de tu componente Game
  const [status, setStatus] = useState<GameStatus>("PLAYING");
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
    var currentFeedback = validate(code, finalGuess);
    setHistory([...history, { guess: finalGuess, results: currentFeedback }]);
    console.log(history.length);
  };
  useEffect(() => {
    const lastAttempt = history.at(-1);
    const hasWon = lastAttempt?.results.every((status) => status === "MATCH");
    if (hasWon) {
      setStatus("WON");
    } else if (history.length >= MAX_ATTEMPTS) {
      console.log(history.length);
      setStatus("LOST");
    } else {
      setCurrentGuess(Array(4).fill(null));
    }
  }, [history]);

  return (
    <>
      {status !== "PLAYING" && (
        <GameResultModal
          code={code}
          btnPrimary={() => setStatus("PLAYING")}
          btnSecondary={function (): void {
            throw new Error("Function not implemented.");
          }}
          status={status}
        />
      )}

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
    </>
  );
}
