"use client";
import { MastermindColor, GameStatus, AttemptResponse } from "@/lib/game/types";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useMastermindApi } from "./useMastermindApi";
import { useColorSelection } from "@/components/game/useColorSelection";

export function useMastermind(gameId: string) {
  const [secretCode, setSecretCode] = useState<(MastermindColor | null)[]>(
    Array(4).fill(null)
  );
  const { submitAttempt, isPending, game } = useMastermindApi(gameId);
  const [submissionId, setSubmissionId] = useState(v4());
  const {
    handleRemoveColor,
    handleSelectColor,
    currentGuess,
    clearCurrentGuess,
  } = useColorSelection();
  const history = game?.attempts ?? [];
  const ghostHistory = game?.ghostAttempts ?? [];
  const isAnonymus: boolean = !game?.playerUserId;
  const status: GameStatus = (game?.status as GameStatus) ?? "PLAYING";

  const handleSubmitAttempt = async (): Promise<AttemptResponse> => {
    const finalGuess = currentGuess as MastermindColor[];
    const responseAttempt: AttemptResponse = await submitAttempt(
      finalGuess,
      submissionId
    );
    setSubmissionId(v4());
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
    ghostHistory,
    isAnonymus,
  };
}
