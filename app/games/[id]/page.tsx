"use client";

import AttemptRow from "@/app/games/components/attemptRow";
import ColorPicker from "@/components/game/colorPicker";
import GameResultModal from "@/app/games/components/gameResultModal";
import ColorSequenceRow from "@/components/game/colorSequenceRow";
import { useMastermind } from "../useMastermind";
import { use, useEffect, useState } from "react";
import { AttemptResponse } from "@/lib/game/types";
import useToastit from "@/hooks/useToastit";
import { useCreatePuzzleAndGame } from "@/hooks/game/useCreatePuzzleAndGame";
import { Card } from "react-bootstrap";
import React from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import { ROUTES } from "@/lib/routes";
import ShareChallengeModal from "@/components/modals/shareChallengeModal";
import { useRouter } from "next/navigation";

export default function GameDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { createPuzzleAndGame, isPending: isPendingNewGame } =
    useCreatePuzzleAndGame();
  const { error } = useToastit();
  const { id } = use(params);
  const redirect = useRouter();
  const {
    status,
    history,
    currentGuess,
    handleSelectColor,
    handleRemoveColor,
    handleSubmitAttempt,
    secretCode,
    isPending,
    ghostHistory,
    isAnonymus,
  } = useMastermind(id);

  const [showGameResultModal, setShowGameResultModal] = useState<boolean>(
    status != "PLAYING"
  );
  const [showChallengeModal, setShowChallengeModal] = useState<boolean>(false);

  useEffect(() => {
    setShowGameResultModal(status != "PLAYING");
  }, [status]);

  const onSubmit = async () => {
    if (isPending || status !== "PLAYING") return;
    if (currentGuess.includes(null)) {
      error("You must choose 4 colors to make a guess");
      return;
    }
    const rsta: AttemptResponse = await handleSubmitAttempt();
    if (rsta.gameStatus != "PLAYING") {
      setShowGameResultModal(true);
    }
  };
  const handleNewGame = async () => {
    await createPuzzleAndGame();
    setShowGameResultModal(false);
  };
  const { loginWithGoogle, isLoading } = useLogin();
  const handleShareGame = async () => {
    if (isAnonymus) {
      const destination = `${ROUTES.game(id)}?claimGameId=${id}`;
      const queryParams = `?next=${encodeURIComponent(destination)}`;
      return await loginWithGoogle(queryParams);
    }
    setShowGameResultModal(false);
    setShowChallengeModal(true);
  };
  return (
    <>
      {showChallengeModal && (
        <ShareChallengeModal
          gameId={id}
          onClose={() => {
            setShowChallengeModal(false); setShowGameResultModal(true);
          }}
        ></ShareChallengeModal>
      )}
      {showGameResultModal && (
        <GameResultModal
          code={secretCode}
          btnPrimary={() => handleNewGame()}
          btnPrimaryDisable={isPendingNewGame}
          btnSecondaryDisable={isLoading}
          btnSecondary={() => handleShareGame()}
          onClose={() => redirect.push(ROUTES.dashboard())}
          status={status}
          btnReview={() => redirect.push(ROUTES.reviewGame(id))}
        />
      )}

      <div
        className="d-flex flex-column pt-5 bg-primary bg-opacity-100 bgGradient"
        style={{
          height: "100vh",
        }}
      >
        <div
          className="d-flex mt-auto flex-column  justify-content-center  items-center gap-10 py-2 flex-1"
          style={{ minHeight: 0 }}
        >
          {/* container with scroll */}
          <div
            className="d-flex justify-content-center   w-100 mt-4 rounded-4 overflow-auto flex-1"
            style={{ minHeight: 0 }}
          >
            <div style={{ minHeight: "max-content" }}>
              {history.map((attempt, index) => {
                const ghostMatch = ghostHistory && ghostHistory[index];
                //we validate the current position and the before becasue the ghostHistory keep pushing attempts as undefiend
                const isGhostWinningTurn =
                  ghostHistory &&
                  ghostMatch?.result?.every((r) => r === "MATCH");
                return (
                  <React.Fragment
                    key={`round-${attempt.submissionId || index}`}
                  >
                    {/* 1. First we show the ghost*/}
                    {ghostMatch?.guess && (
                      <AttemptRow
                        props={{
                          attemptGuess: ghostMatch.guess,
                          results: ghostMatch.result,
                          isGhostMode: true,
                        }}
                      />
                    )}
                    {isGhostWinningTurn && (
                      <div className="text-xs mx-2 text-center p-1 rounded-3 bg-light bg-opacity-75 italic my-1">
                        The ghost finished its game here! 👻
                      </div>
                    )}

                    {/* 2. then the player attempt*/}
                    <AttemptRow
                      props={{
                        attemptGuess: attempt.guess,
                        results: attempt.result,
                        isGhostMode: false,
                      }}
                    />
                  </React.Fragment>
                );
              })}
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
