"use client";
import {
  MastermindColor,
  GameStatus,
  FeedbackStatus,
  AttemptResponse,
} from "@/lib/game/types";
import { useState } from "react";
import { v4 } from "uuid";

import { useCurrentGuess } from "./useCurrentGuess";
import { useMastermindApi } from "./useMastermindApi";

export function useMastermind(gameId: string) {
  const [secretCode, setSecretCode] = useState<(MastermindColor | null)[]>(
    Array(4).fill(null)
  );
  const [status, setStatus] = useState<GameStatus>("PLAYING");
  const [history, setHistory] = useState<
    { guess: MastermindColor[]; results: FeedbackStatus[] }[]
  >([]);
  const { submitAttempt, isPending } = useMastermindApi(gameId);
  const {
    handleRemoveColor,
    handleSelectColor,
    currentGuess,
    clearCurrentGuess,
  } = useCurrentGuess();

  const handleSubmitAttempt = async (): Promise<AttemptResponse | null> => {
    if (currentGuess.includes(null)) {
      alert("Fill all the options");

      return null;
    }

    const finalGuess = currentGuess as MastermindColor[];
    const submissionId = v4();
    let responseAttempt: AttemptResponse = await submitAttempt(
      finalGuess,
      submissionId
    );

    setHistory((prev) => [
      ...prev,
      { guess: finalGuess, results: responseAttempt.feedback },
    ]);
    handleGameStatus(responseAttempt.gameStatus, responseAttempt.secretCode);
    return responseAttempt;
  };
  const handleGameStatus = (
    status: GameStatus,
    secretCode?: MastermindColor[]
  ) => {
    switch (status) {
      case "WON":
        setStatus("WON");
        setSecretCode(secretCode!);
        break;
      case "LOST":
        setStatus("LOST");
        setSecretCode(secretCode!);

        break;
      default:
        clearCurrentGuess();
        break;
    }
  };

  const resetGame = () => {
    setStatus("PLAYING");
    setHistory([]);
    clearCurrentGuess();
  };

  return {
    status,
    history,
    currentGuess,
    handleSelectColor,
    handleRemoveColor,
    handleSubmitAttempt,
    resetGame,
    isPending,
    secretCode,
  };
}
