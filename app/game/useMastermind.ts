import { generateSecretCode, validate } from "@/lib/game/engine";
import { MastermindColor, GameStatus, FeedbackStatus } from "@/lib/game/types";
import { useState } from "react";

export function useMastermind() {
  const MAX_ATTEMPTS = 1;
  const [code, setCode] = useState<MastermindColor[]>(generateSecretCode());
  const [status, setStatus] = useState<GameStatus>("PLAYING");
  const [history, setHistory] = useState<
    { guess: MastermindColor[]; results: FeedbackStatus[] }[]
  >([]);
  const [currentGuess, setCurrentGuess] = useState<(MastermindColor | null)[]>(
    Array(4).fill(null)
  );

  const handleSelectColor = (color: MastermindColor) => {
    if (status !== "PLAYING") return;
    const firstEmptyIndex = currentGuess.indexOf(null);
    if (firstEmptyIndex !== -1) {
      const newGuess = [...currentGuess];
      newGuess[firstEmptyIndex] = color;
      setCurrentGuess(newGuess);
    }
  };

  const handleRemoveColor = (index: number) => {
    if (status !== "PLAYING") return;
    const newGuess = [...currentGuess];
    newGuess[index] = null;
    setCurrentGuess(newGuess);
  };

  const handleSubmitAttempt = () => {
    if (currentGuess.includes(null)) return alert("Fill all the options");

    const finalGuess = currentGuess as MastermindColor[];
    const currentFeedback = validate(code, finalGuess);

    const newHistory = [
      ...history,
      { guess: finalGuess, results: currentFeedback },
    ];
    setHistory(newHistory);

    const hasWon = currentFeedback.every((s) => s === "MATCH");

    if (hasWon) {
      setStatus("WON");
    } else if (newHistory.length >= MAX_ATTEMPTS) {
      setStatus("LOST");
    } else {
      setCurrentGuess(Array(4).fill(null));
    }
  };

  const resetGame = () => {
    setCode(generateSecretCode());
    setStatus("PLAYING");
    setHistory([]);
    setCurrentGuess(Array(4).fill(null));
  };

  return {
    status,
    history,
    currentGuess,
    handleSelectColor,
    handleRemoveColor,
    handleSubmitAttempt,
    resetGame,
    code,
  };
}
