"use client";

import { Button } from "react-bootstrap";
import { Opening } from "@/components/opening";
import { useCreateChallengeAndGame } from "@/hooks/game/useCreateChallengeAndGame";

export default function Dashboard() {
  const { createChallengeAndGame, isPending } = useCreateChallengeAndGame();

  return (
    <>
      <div className="margin-top px-2">
        <Opening />

        <Button onClick={() => createChallengeAndGame()} disabled={isPending}>
          Start Game!
        </Button>
      </div>
    </>
  );
}
