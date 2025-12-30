import { createCustomChallengeAction } from "@/app/actions/challengeActions";
import { createPuzzleAction } from "@/app/actions/puzzleActions";
import useToastit from "@/hooks/useToastit";
import {  MastermindColor } from "@/lib/game/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateCustomChallenge = () => {
  const { success, error } = useToastit();
  const { mutateAsync: createPuzzle } = useMutation({
    mutationFn: async (secretCode: MastermindColor[]): Promise<string> => {
      return createPuzzleAction(secretCode);
    },
    onError: (err) => {
      console.error("Error creating ghost challenge:", err);
      error(err.message || "Error creating ghost challenge");
      throw err;
    },
  });

  const { mutateAsync: createChallenge } = useMutation({
    mutationFn: async (gameId: string): Promise<string> => {
      return createCustomChallengeAction(gameId);
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
  const handleSharePuzzle = async (
    secretCode: MastermindColor[]
  ): Promise<void> => {
    try {
      console.log("llega")
      const puzzleId: string = await createPuzzle(secretCode);
      const challengeId = await createChallenge(puzzleId);
console.log("creatodo")
      const text: string = generateText(challengeId);
      navigator.clipboard.writeText(text);
      console.log("deveria devoler")
      success("Copied to clipboard!");
    } catch (err) {
      error("An error occurred while copying to clipboard");
    }
  };
  return { handleSharePuzzle };
};
