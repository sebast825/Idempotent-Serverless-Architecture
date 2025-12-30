"use client";

import AttemptRow from "@/app/games/components/attemptRow";
import ColorPicker from "@/components/game/colorPicker";
import GameResultModal from "@/app/games/components/gameResultModal";
import ColorSequenceRow from "@/components/game/colorSequenceRow";
import { useMastermind } from "../useMastermind";
import { use, useState } from "react";
import { AttemptResponse } from "@/lib/game/types";
import useToastit from "@/hooks/useToastit";
import { useCreatePuzzleAndGame } from "@/hooks/game/useCreatePuzzleAndGame";
import { Card } from "react-bootstrap";

export default function GameDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { createPuzzleAndGame, isPending: isPendingNewGame } =
    useCreatePuzzleAndGame();
  const { error } = useToastit();
  const { id } = use(params);

  const {
    status,
    history,
    currentGuess,
    handleSelectColor,
    handleRemoveColor,
    handleSubmitAttempt,
    secretCode,
    isPending,
  } = useMastermind(id);
  const onSubmit = async () => {
    if (isPending || status !== "PLAYING") return;
    if (currentGuess.includes(null)) {
      error("You must choose 4 colors to make a guess");
      return;
    }
    const rsta: AttemptResponse = await handleSubmitAttempt();
    if (rsta.gameStatus != "PLAYING") {
      setShowModal(true);
    }
  };
  const handleNewGame = async () => {
    await createPuzzleAndGame();
    setShowModal(false);
  };
  return (
    <>
      {showModal && (
        <GameResultModal
          code={secretCode}
          btnPrimary={() => handleNewGame()}
          btnPrimaryDisable={isPendingNewGame}
          onClose={() => setShowModal(false)}
          status={status}
        />
      )}

      <div
        className="d-flex flex-column pt-5 "
        style={{
          height: "100vh",
          background: `
    linear-gradient(
        180deg,
        #1a4a7aff 0%,
        #2b5e91ff 35%,
        #126ecaff 100%
      )
    `,
        }}
      >
        <div
          className="d-flex mt-auto flex-column  justify-content-center  items-center gap-10 py-2 flex-1"
          style={{ minHeight: 0 }}
        >
          {/* Contenedor para el historial con scroll */}
          <div
            className="d-flex justify-content-center  w-100 mt-4 rounded-4 overflow-auto flex-1"
            style={{ minHeight: 0 }}
          >
            <div style={{ minHeight: "max-content" }}>
              {history.map((attempt, index) => (
                <AttemptRow
                  key={history.length - index}
                  props={{
                    attemptGuess: attempt.guess,
                    results: attempt.result,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 1. Active Guess Display */}
        <div className=" w-100">
          <ColorSequenceRow
            currentGuess={currentGuess}
            handleRemoveColor={(e) => handleRemoveColor(e)}
          ></ColorSequenceRow>
          {/* 2. Color Selection Palette */}
          <Card className="shadow-sm bg-dark bg-opacity-50 text-light rounded-0 mt-2">
            <Card.Body className="text-center">
              <div className="bg-black bg-opacity-50 rounded-3 py-3">
                <ColorPicker
                  handleSelect={(e) => handleSelectColor(e)}
                  currentGuess={currentGuess}
                  submit={() => onSubmit()}
                  disableBtn={isPending || status !== "PLAYING"}
                ></ColorPicker>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
