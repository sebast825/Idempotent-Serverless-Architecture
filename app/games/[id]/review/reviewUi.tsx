"use client";

import AttemptRow from "../../components/attemptRow";
import ColorSequenceRow from "../../../../components/game/colorSequenceRow";
import {
  GameWithAttemptsAndPuzzle,
  GameWithGhostAndPuzzle,
  MastermindColor,
} from "@/lib/game/types";
import { Card, Badge } from "react-bootstrap";
import React from "react";

export default function ReviewGame({ game }: { game: GameWithGhostAndPuzzle }) {
  console.log(game);
  return (
    <>
      <div
        className="d-flex flex-column pt-5 bgGradient"
        style={{
          height: "100vh",
        }}
      >
        <div
          className="d-flex mt-auto flex-column  justify-content-center  items-center gap-10 py-2 flex-1"
          style={{ minHeight: 0 }}
        >
          <div
            className="d-flex justify-content-center  w-100 mt-4  overflow-auto flex-1"
            style={{ minHeight: 0 }}
          >
            <div style={{ minHeight: "max-content" }}>
              {game.attempts.map((attempt, index) => {
                const ghostMatch =
                  game.ghostAttempts && game.ghostAttempts[index];
                //we validate the current position and the before becasue the game.attempts.ghostAttempts keep pushing attempts as undefiend
                const isGhostWinningTurn =
                  game.ghostAttempts &&
                  game.ghostAttempts[index]?.result !== undefined &&
                  game.ghostAttempts[index + 1]?.result === undefined;
                return (
                  <React.Fragment
                    key={`round-${attempt.submissionId || index}`}
                  >
                    <div className="text-light my-1 p-2 d-flex flex-row align-items-center justify-content-center bg-black overflow-hiden  bg-opacity-25 rounded-2  py-1 gap-3">
                      <h4 className="">
                        {index}
                        {"."}
                      </h4>
                      <div style={{ maxWidth: "max-content" }}>
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
                          <div className="text-xs mx-2 text-center p-1 rounded-3 bg-light text-dark bg-opacity-75 italic my-1">
                            You finished the game here! 👻
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
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <Card className="shadow-sm bg-dark bg-opacity-50 text-light rounded-0">
            <Card.Body className="text-center">
              {game.puzzle.secretCode && (
                <div className="">
                  <div className="d-flex justify-content-center flex-column bg-black bg-opacity-50 rounded-3 py-3">
                    <div className="d-flex justify-content-center align-items-center p-2 mb-2">
                      <Badge
                        bg={game?.status === "WON" ? "success" : "danger"}
                        className="px-3 py-2"
                      >
                        {game?.status}
                      </Badge>
                    </div>
                    <h6 className="text-slate-400 mb-3 uppercase small font-bold">
                      Secret Code to Crack
                    </h6>
                    <ColorSequenceRow
                      currentGuess={game.puzzle.secretCode as MastermindColor[]}
                      handleRemoveColor={() => {}}
                      btnPointer={false}
                    />
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
