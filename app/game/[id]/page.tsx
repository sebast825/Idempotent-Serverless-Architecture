"use client";

import AttemptRow from "@/app/game/components/attemptRow";
import ColorPicker from "@/app/game/components/colorPicker";
import GameResultModal from "@/app/game/components/gameResultModal";
import GuessRow from "@/app/game/components/guessRow";
import { useMastermind } from "../useMastermind";
import { use, useState } from "react";
import { ActionResult } from "next/dist/server/app-render/types";
import { AttemptResponse } from "@/lib/game/types";

export default function GameDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [showModal, setShowModal] = useState<boolean>(true);
  const { id } = use(params);
  const {
    status,
    history,
    currentGuess,
    handleSelectColor,
    handleRemoveColor,
    handleSubmitAttempt,
    resetGame,
    secretCode,
    isPending,
  } = useMastermind(id);

  const onSubmit = async () => {
    const rsta: AttemptResponse | null = await handleSubmitAttempt();
    if (rsta != null && rsta.gameStatus != "PLAYING") {
      setShowModal(true);
    }
  };
  return (
    <>
      {showModal && (
        <GameResultModal
          code={secretCode}
          btnPrimary={() => resetGame()}
          onClose={() => setShowModal(false)}
          status={status}
        />
      )}

      <div className="d-flex flex-column items-center gap-10 pt-5 mt-5">
        <div className="game-history-container w-100 mt-4">
          {history.map((attempt, index) => (
            <AttemptRow
              key={history.length - index}
              props={{
                attemptGuess: attempt.guess,
                results: attempt.results,
              }}
            />
          ))}
        </div>
        {/* 1. Active Guess Display */}
        <GuessRow
          currentGuess={currentGuess}
          handleRemoveColor={(e) => handleRemoveColor(e)}
        ></GuessRow>
        {/* 2. Color Selection Palette */}
        <ColorPicker
          handleSelect={(e) => handleSelectColor(e)}
          currentGuess={currentGuess}
          submit={() => onSubmit()}
          disableBtn={isPending}
        ></ColorPicker>
      </div>
    </>
  );
}
