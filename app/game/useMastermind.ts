"use client";
import { generateSecretCode } from "@/lib/game/engine";
import { MastermindColor, GameStatus, FeedbackStatus } from "@/lib/game/types";
import { useState } from "react";
import { submitGuessAction } from "./actions";
import { v4 as uuidv4 } from "uuid";

export function useMastermind() {
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

  const handleSubmitAttempt = async (gameId: string) => {
    if (currentGuess.includes(null)) return alert("Fill all the options");

    const finalGuess = currentGuess as MastermindColor[];
    const submissionId = uuidv4();
    const attemptRepsonse = await submitGuessAction(
      finalGuess,
      gameId,
      submissionId
    );

    setHistory([
      ...history,
      { guess: finalGuess, results: attemptRepsonse.feedback },
    ]);
    switch (attemptRepsonse.gameStatus) {
      case "WON":
        return setStatus("WON");
      case "LOST":
        return setStatus("LOST");
      default:
        setCurrentGuess(Array(4).fill(null));
        return;
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
