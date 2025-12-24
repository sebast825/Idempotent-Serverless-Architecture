"use client";

import { Button } from "react-bootstrap";
import { Opening } from "@/components/opening";
import { useCreateChallengeAndGame } from "@/hooks/game/useCreateChallengeAndGame";
import { GameHistoryModal } from "@/components/modals/gameHistoryModal";
import { useState } from "react";

export default function Dashboard() {
  const { createChallengeAndGame, isPending } = useCreateChallengeAndGame();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="margin-top px-2">
        <Opening />
        <button onClick={() => setShowModal(true)}>Show modal</button>
        {showModal && <GameHistoryModal onClose={() => setShowModal(false)} />}
        <Button onClick={() => createChallengeAndGame()} disabled={isPending}>
          Start Game!
        </Button>
      </div>
    </>
  );
}
