"use client";
import { getGameForReview } from "@/app/actions/gameActions";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import AttemptRow from "../../components/attemptRow";
import GuessRow from "../../components/guessRow";
import { MastermindColor } from "@/lib/game/types";
import { Card, Badge } from "react-bootstrap";

export default function ReviewGame({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: game } = useQuery({
    queryKey: ["game", id],
    queryFn: () => getGameForReview(id),

    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnReconnect: false,
  });
  return (
    <>
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
          <div
            className="d-flex justify-content-center  w-100 mt-4  overflow-auto flex-1"
            style={{ minHeight: 0 }}
          >
            <div style={{ minHeight: "max-content" }}>
              {game?.attempts.map((attempt, index) => (
                <div
                  className="text-light d-flex flex-row align-items-center bg-black  bg-opacity-25 rounded-2 px-3 py-1 gap-3"
                  key={history.length - index}
                >
                  <h4 className=" ">{index}|</h4>

                  <AttemptRow
                    props={{
                      attemptGuess: attempt.guess,
                      results: attempt.result,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Card className="shadow-sm bg-dark bg-opacity-50 text-light rounded-0">
            <Card.Body className="text-center">
              {game?.puzzle?.secretCode && (
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
                    <GuessRow
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
