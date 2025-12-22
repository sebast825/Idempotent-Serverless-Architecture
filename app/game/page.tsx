"use client";

import AttemptRow from "@/app/game/components/attemptRow";
import ColorPicker from "@/app/game/components/colorPicker";
import GameResultModal from "@/app/game/components/gameResultModal";
import GuessRow from "@/app/game/components/guessRow";
import { useMastermind } from "./useMastermind";

export default function GameDashboard() {
  const {
    status,
    history,
    currentGuess,
    handleSelectColor,
    handleRemoveColor,
    handleSubmitAttempt,
    resetGame,
    code,
  } = useMastermind();
  return (
    <>
      {status !== "PLAYING" && (
        <GameResultModal
          code={code}
          btnPrimary={() => resetGame()}
          btnSecondary={function (): void {
            throw new Error("Function not implemented.");
          }}
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
          submit={handleSubmitAttempt}
        ></ColorPicker>
      </div>
    </>
  );
}
