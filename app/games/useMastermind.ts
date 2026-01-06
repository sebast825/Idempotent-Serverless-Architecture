"use client";
import { MastermindColor, GameStatus, AttemptResponse } from "@/lib/game/types";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useMastermindApi } from "./useMastermindApi";
import { useColorSelection } from "@/components/game/useColorSelection";

export function useMastermind(gameId: string) {
  const { submitAttempt, isPending, game ,isPendingGame} = useMastermindApi(gameId);
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
  const [secretCode, setSecretCode] = useState<(MastermindColor | null)[]>(
    Array(4).fill(null)
  );
  useEffect(() => {
    if (game?.puzzle?.secretCode)
      setSecretCode(game?.puzzle?.secretCode as MastermindColor[]);
  }, [game?.puzzle?.secretCode]);

  const handleSubmitAttempt = async (): Promise<AttemptResponse> => {
    const finalGuess = currentGuess as MastermindColor[];
    const responseAttempt: AttemptResponse = await submitAttempt(
      finalGuess,
      submissionId
    );
    setSubmissionId(v4());
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
    isPendingGame
  };
}
