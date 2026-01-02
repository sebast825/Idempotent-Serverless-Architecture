"use client";
import { createGameAction } from "@/app/actions/gameActions";
import { createChallengeAcceptedNotification } from "@/app/actions/notificationActions";
import { useCreatePuzzleAndGame } from "@/hooks/game/useCreatePuzzleAndGame";
import useToastit from "@/hooks/useToastit";
import { FEEDBACK_TO_EMOJI } from "@/lib/game/types";
import { ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Container, Row, Col, Button, Card } from "react-bootstrap";

interface propsPuzzleUi {
  children?: React.ReactNode;
  puzzleId: string;
  challengeId: string;
}
export const ChallengeUi = ({
  children,
  puzzleId,
  challengeId,
}: propsPuzzleUi) => {
  const { createPuzzleAndGame, isPending: isPendingCreatePuzzleAndGame } =
    useCreatePuzzleAndGame();

  const router = useRouter();
  const { error } = useToastit();
  const { mutateAsync, isPending: isPendingCreateGame } = useMutation({
    mutationFn: async () => {
      const game =  await createGameAction(puzzleId, challengeId);
      await createChallengeAcceptedNotification(challengeId,game.id);
      return game;
    },
    onSuccess: (data) => {
      router.push(ROUTES.game(data.id));
    },
    onError: (err) => {
      console.error("Error creating game from puzzle:", err);
      error("Error accepting puzzle. Please try again.");
    },
  });



  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={8} xl={6}>
          <Card className="shadow-lg border-0 text-center p-4 p-md-5">
            <Card.Body>
              <Card.Title className="display-6 fw-bold mb-3">
                <div className=" text-warning" style={{ fontSize: "3rem" }}>
                  <h2>🏆🏆🏆</h2>
                </div>
                Mastermind Puzzle
              </Card.Title>

              {children}

              <div className="d-grid gap-3 ">
                <Button
                  variant="primary"
                  size="lg"
                  className="py-3 fw-bold shadow-sm"
                  onClick={() => mutateAsync()}
                  disabled={isPendingCreateGame}
                >
                  ACCEPT CHALLENGE
                </Button>

                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="border-0"
                  onClick={() => createPuzzleAndGame()}
                  disabled={isPendingCreatePuzzleAndGame}
                >
                  {"I'm scared"}, just let me play a normal game
                </Button>
              </div>
              <hr className="my-4 opacity-25" />

              <div className="mt-4 d-flex justify-content-center gap-4 text-muted small">
                <div className="">
                  <p>Guess the secret code in 12 attempts!</p>
                  <ul className="text-start">
                    <li>{FEEDBACK_TO_EMOJI.MATCH} Correct color & position</li>
                    <li>
                      {FEEDBACK_TO_EMOJI.COLOR_ONLY} Correct color, wrong
                      position
                    </li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
