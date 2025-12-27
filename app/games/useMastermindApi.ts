import { MastermindColor, AttemptResponse } from "@/lib/game/types";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { submitGuessAction } from "./actions";
import { findExistingGame } from "../actions/gameActions";
import useToastit from "@/hooks/useToastit";

export const useMastermindApi = (gameId: string) => {
  const { error } = useToastit();
  const queryClient = useQueryClient();
  const { data: game } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => findExistingGame(gameId),
    //avoid unnecesary refetchs
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnReconnect: false,
  });

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
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["game", gameId], (oldData: any) => {
        if (!oldData) return oldData;

        const newAttempt = {
          guess: variables.finalGuess,
          results: _data.feedback,
          submissionId: variables.submissionId,
        };
        return {
          ...oldData,
          status: _data.gameStatus,
          attempts: [...oldData.attempts, newAttempt],
        };
      });
    },
    onError: (err: Error) => {
      error(err.message);
    },
  });
  const submitAttempt = async (
    finalGuess: MastermindColor[],
    submissionId: string
  ): Promise<AttemptResponse> => {
    return mutateAsync({ finalGuess, submissionId });
  };
  return { submitAttempt, isPending, game };
};
