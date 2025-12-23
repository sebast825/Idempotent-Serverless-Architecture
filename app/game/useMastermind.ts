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

export function useMastermind() {
  const [code, setCode] = useState<MastermindColor[]>(generateSecretCode());
  const [status, setStatus] = useState<GameStatus>("PLAYING");
  const [history, setHistory] = useState<
    { guess: MastermindColor[]; results: FeedbackStatus[] }[]
  >([]);

  const {
    handleRemoveColor,
    handleSelectColor,
    currentGuess,
    clearCurrentGuess,
  } = useCurrentGuess();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      finalGuess,
      gameId,
      submissionId,
    }: {
      finalGuess: MastermindColor[];
      gameId: string;
      submissionId: string;
    }): Promise<AttemptResponse> => {
      return await submitGuessAction(finalGuess, gameId, submissionId);
    },
    onSuccess: (_data, variables) => {
      console.log(_data);
      queryClient.invalidateQueries({ queryKey: ["game", variables.gameId] });
    },
    onError: (error: any) => {
      console.error("Error al enviar intento:", error);
      alert("An error happend.");
    },
  });
  const handleSubmitAttempt = async (gameId: string) => {
    if (currentGuess.includes(null)) return alert("Fill all the options");

    const finalGuess = currentGuess as MastermindColor[];
    const submissionId = uuidv4();

    mutate(
      { finalGuess, gameId, submissionId },
      {
        onSuccess: (_data) => {
          setHistory((prev) => [
            ...prev,
            { guess: finalGuess, results: _data.feedback },
          ]);
          switch (_data.gameStatus) {
            case "WON":
              setStatus("WON");
              break;
            case "LOST":
              setStatus("LOST");
              break;
            default:
              clearCurrentGuess();
              break;
          }
        },
      }
    );
  };

  const resetGame = () => {
    setCode(generateSecretCode());
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
    code,
    isPending,
  };
}
