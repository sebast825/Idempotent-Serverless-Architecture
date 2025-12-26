"use client";

import { Button } from "react-bootstrap";
import { Opening } from "@/components/opening";
import { useCreatePuzzleAndGame } from "@/hooks/game/useCreatePuzzleAndGame";
import { GenericModal } from "@/components/modals/genericModal";
import { useState } from "react";
import { HistoryGamesTable } from "@/components/tables/historyGamesTable";
import { useModalStore } from "@/store/useModalStore";

export default function Dashboard() {
  const { createPuzzleAndGame, isPending } = useCreatePuzzleAndGame();
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <>
      <div className="margin-top px-2">
        <Opening />
        <button onClick={() => openModal("HISTORYGAMES")}>Show modal</button>
        {showModal && (
          <GenericModal onClose={() => setShowModal(false)}>
            <HistoryGamesTable />
          </GenericModal>
        )}
        <Button onClick={() => createPuzzleAndGame()} disabled={isPending}>
          Start Game!
        </Button>
      </div>
    </>
  );
}
