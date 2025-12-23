"use client";
import { generateSecretCode } from "@/lib/game/engine";
import {
  MastermindColor,
  GameStatus,
  FeedbackStatus,
  MASTERMIND_COLORS,
  AttemptResponse,
} from "@/lib/game/types";
import { useState } from "react";
import { submitGuessAction } from "./actions";
import { v4 as uuidv4 } from "uuid";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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

  const handleSubmitAttempt = async (gameId: string) => {
    if (currentGuess.includes(null)) return alert("Fill all the options");

    const finalGuess = currentGuess as MastermindColor[];
    const submissionId = uuidv4();
    let responseAttempt: AttemptResponse = await submitAttempt(
      finalGuess,
      submissionId
    );

    setHistory((prev) => [
      ...prev,
      { guess: finalGuess, results: responseAttempt.feedback },
    ]);
    switch (responseAttempt.gameStatus) {
      case "WON":
        setStatus("WON");
        setSecretCode(responseAttempt.secretCode!);
        break;
      case "LOST":
        console.log("entra en lost")
        setStatus("LOST");
        setSecretCode(responseAttempt.secretCode!);

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
