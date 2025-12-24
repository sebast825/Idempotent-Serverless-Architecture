"use client";

import AttemptRow from "@/app/game/components/attemptRow";
import ColorPicker from "@/app/game/components/colorPicker";
import GameResultModal from "@/app/game/components/gameResultModal";
import GuessRow from "@/app/game/components/guessRow";
import { useMastermind } from "../useMastermind";
import { use, useState } from "react";
import { AttemptResponse } from "@/lib/game/types";
import useToastit from "@/hooks/useToastit";

export default function GameDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { error } = useToastit();
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
    if (currentGuess.includes(null)) {
      error("You must choose 4 colors to make a guess");
      return;
    }
    const rsta: AttemptResponse = await handleSubmitAttempt();
    if (rsta.gameStatus != "PLAYING") {
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

      <div className="d-flex flex-column pt-5" style={{ height: "100vh" }}>
        <div
          className="d-flex mt-auto flex-column items-center gap-10 py-2 flex-1"
          style={{ minHeight: 0 }}
        >
          {/* Contenedor para el historial con scroll */}
          <div
            className="game-history-container w-100 mt-4 overflow-auto flex-1"
            style={{ minHeight: 0 }}
          >
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
        </div>

        {/* 1. Active Guess Display */}
        <div className=" w-100">
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
      </div>
    </>
  );
}
