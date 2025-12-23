import { MastermindColor, AttemptResponse } from "@/lib/game/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { submitGuessAction } from "./actions";

export const useMastermindApi = (gameId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({
      finalGuess,
      submissionId,
    }: {
      finalGuess: MastermindColor[];
      submissionId: string;
    }): Promise<AttemptResponse> => {
      return await submitGuessAction(finalGuess, gameId, submissionId);
    },
    onSuccess: (_data) => {
      console.log(_data);
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    },
    onError: (error: any) => {
      console.error("Error al enviar intento:", error);
      alert("An error happend.");
    },
  });
  const submitAttempt = async (
    finalGuess: MastermindColor[],
    submissionId: string
  ): Promise<AttemptResponse> => {
    return mutateAsync({ finalGuess, submissionId });
  };
  return { submitAttempt, isPending };
};
