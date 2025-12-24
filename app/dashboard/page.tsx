"use client";

import { Button } from "react-bootstrap";
import { Opening } from "@/components/opening";
import { useCreateChallengeAndGame } from "@/hooks/game/useCreateChallengeAndGame";
import { GenericModal } from "@/components/modals/genericModal";
import { useState } from "react";
import { HistoryGamesTable } from "@/components/tables/historyGamesTable";

export default function Dashboard() {
  const { createChallengeAndGame, isPending } = useCreateChallengeAndGame();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="margin-top px-2">
        <Opening />
        <button onClick={() => setShowModal(true)}>Show modal</button>
        {showModal && (
          <GenericModal onClose={() => setShowModal(false)}>
            <HistoryGamesTable />
          </GenericModal>
        )}
        <Button onClick={() => createChallengeAndGame()} disabled={isPending}>
          Start Game!
        </Button>
      </div>
    </>
  );
}
