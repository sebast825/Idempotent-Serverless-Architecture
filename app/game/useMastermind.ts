"use client";
import { MastermindColor, GameStatus, AttemptResponse } from "@/lib/game/types";
import { useState } from "react";
import { v4 } from "uuid";
import { useCurrentGuess } from "./useCurrentGuess";
import { useMastermindApi } from "./useMastermindApi";

export function useMastermind(gameId: string) {
  const [secretCode, setSecretCode] = useState<(MastermindColor | null)[]>(
    Array(4).fill(null)
  );
  const { submitAttempt, isPending, game } = useMastermindApi(gameId);
  const {
    handleRemoveColor,
    handleSelectColor,
    currentGuess,
    clearCurrentGuess,
  } = useCurrentGuess();
  const history = game?.attempts ?? [];
  const status: GameStatus = (game?.status as GameStatus) ?? "PLAYING";

  const handleSubmitAttempt = async (): Promise<AttemptResponse> => {
    const finalGuess = currentGuess as MastermindColor[];
    const submissionId = v4();
    let responseAttempt: AttemptResponse = await submitAttempt(
      finalGuess,
      submissionId
    );
    console.log(responseAttempt);
    handleGameStatus(responseAttempt.gameStatus, responseAttempt.secretCode);
    return responseAttempt;
  };
  const handleGameStatus = (
    status: GameStatus,
    secretCode?: MastermindColor[]
  ) => {
    switch (status) {
      case "WON":
        setSecretCode(secretCode!);
        break;
      case "LOST":
        setSecretCode(secretCode!);
        break;
      default:
        clearCurrentGuess();
        break;
    }
  };

  return {
    status,
    history,
    currentGuess,
    handleSelectColor,
    handleRemoveColor,
    handleSubmitAttempt,
    isPending,
    secretCode,
  };
}
