"use client";

import { Button } from "react-bootstrap";

import { Opening } from "@/components/opening";
import { createChallengeGameAction } from "../actions/gameActions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createChallengeGameAction,
    onSuccess: (gameId) => {
      router.push(`/game/${gameId}`);
    },
    onError: (error) => {
      console.error("Error al crear el juego:", error);
      alert("An error happend, try again!");
    },
  });
  return (
    <>
    <div className="margin-top px-2">
      <Opening />

      <Button onClick={() => mutate()} disabled={isPending}>
        Start Game!
      </Button>
      </div>
    </>
  );
}
