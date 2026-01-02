import { createCustomChallengeAction } from "@/app/actions/challengeActions";
import { createPuzzleAction } from "@/app/actions/puzzleActions";
import useToastit from "@/hooks/useToastit";
import { MastermindColor } from "@/lib/game/types";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { v4 } from "uuid";

export const useCreateCustomChallenge = () => {
  const { success, error } = useToastit();
  //without useMemo it generate a new key each time the fn is call
  //only will change when the component is unmounted
  const idempotencyKey = useMemo(() => v4(), []);

  const { mutateAsync: createPuzzle, isPending: isCreatingPuzzle } =
    useMutation({
      mutationFn: async (secretCode: MastermindColor[]): Promise<string> => {
        return createPuzzleAction(secretCode);
      },
      onError: (err) => {
        console.error("Error creating ghost challenge:", err);
        error(err.message || "Error creating ghost challenge");
        throw err;
      },
    });

  const { mutateAsync: createChallenge, isPending: isCreatingChallenge } =
    useMutation({
      mutationFn: async (gameId: string): Promise<string> => {
        return createCustomChallengeAction(gameId, idempotencyKey);
      },
      onError: (err) => {
        console.error("Error creating ghost challenge:", err);
        error(err.message || "Error creating ghost challenge");
        throw err;
      },
    });
  const generateText = (challengeId: string): string => {
    const text = `🏆 Mastermind Puzzle! 🧠


🔥 You have been Challenged! 🔥

Accept the puzzle here 👇
${window.location.origin}/challenges/${challengeId}`.trim();
    return text;
  };
  const isProcessing = isCreatingPuzzle || isCreatingChallenge;

  const handleSharePuzzle = async (
    secretCode: MastermindColor[]
  ): Promise<void> => {
    try {
      const puzzleId: string = await createPuzzle(secretCode);
      const challengeId = await createChallenge(puzzleId);
      const text: string = generateText(challengeId);
      navigator.clipboard.writeText(text);
      success("Copied to clipboard!");
    } catch (err) {
      error("An error occurred while copying to clipboard");
    }
  };
  return { handleSharePuzzle, isProcessing };
};
