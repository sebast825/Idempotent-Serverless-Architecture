import { createChallengeGameAction } from "@/app/actions/gameActions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useToastit from "../useToastit";

export const useCreateChallengeAndGame = () => {
  const router = useRouter();
  const { error } = useToastit();
  
  const { mutate: createChallengeAndGame, isPending } = useMutation({
    mutationFn: createChallengeGameAction,
    onSuccess: (gameId) => {
      router.push(`/game/${gameId}`);
    },
    onError: (err) => {
      console.error("Error al crear el juego:", err);
      error("An error happend, try again!");
    },
  });
  return {
    createChallengeAndGame,
    isPending,
  };
};
