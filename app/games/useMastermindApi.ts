import {
  MastermindColor,
  AttemptResponse,
  GhostAttemptResponse,
  GameWithGhost,
} from "@/lib/game/types";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { submitGuessAction } from "./actions";
import { findExistingGame } from "../actions/gameActions";
import useToastit from "@/hooks/useToastit";

export const useMastermindApi = (gameId: string) => {
  const { error } = useToastit();
  const queryClient = useQueryClient();
  const { data: game, isPending: isPendingGame } = useQuery({
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
    }): Promise<GhostAttemptResponse> => {
      return await submitGuessAction(finalGuess, gameId, submissionId);
    },
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ["game", gameId],
        (oldData: GameWithGhost | undefined) => {
          if (!oldData) return oldData;

          const newAttempt = {
            guess: variables.finalGuess,
            result: _data.feedback,
            submissionId: variables.submissionId,
          };
          const ghostAttempt = {
            result: _data.ghostAttempt?.result,
            guess: _data.ghostAttempt?.guess,
          };
          return {
            ...oldData,
            status: _data.gameStatus,
            attempts: [...oldData.attempts, newAttempt],
            ghostAttempts: [...(oldData.ghostAttempts ?? []), ghostAttempt],
          };
        }
      );
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
  return { submitAttempt, isPending, game, isPendingGame };
};
