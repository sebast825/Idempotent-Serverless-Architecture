"use server";
import { validate } from "@/lib/game/engine";
import {
  AttemptResponse,
  FeedbackStatus,
  GameStatus,
  MastermindColor,
} from "@/lib/game/types";
import prisma from "@/lib/prisma";
import { Attempt, Prisma } from "@prisma/client";

const MAX_ATTEMPTS = 2;

type GameWithRelations = Prisma.GameGetPayload<{
  include: {
    attempts: true;
    challenge: true;
  };
}>;

export async function submitGuessAction(
  guessAttempt: MastermindColor[],
  gameId: string,
  attemptKey: string
): Promise<AttemptResponse> {
  const game: GameWithRelations = await findGameOrThrow(gameId);
  await ifAttemptNotExistThrow(game.attempts, attemptKey);

  //validate guessAttempt with the secret
  const currentFeedback = validate(
    game.challenge.secretCode as MastermindColor[],
    guessAttempt
  );

  const isVictoryState: boolean = isVictory(currentFeedback);
  const isLastAttempt: boolean = game.attempts.length + 1 >= MAX_ATTEMPTS;
  const isGameFinished: boolean = isVictoryState || isLastAttempt;
  const nextStatus: GameStatus = isVictoryState
    ? "WON"
    : isLastAttempt
    ? "LOST"
    : "PLAYING";
 
    await prisma.$transaction(async (tx) => {
      await tx.attempt.create({
        data: {
          gameId: game.id,
          submissionId: attemptKey,
          guess: guessAttempt,
          result: currentFeedback,
        },
      });
      //only update is game is finished
      if (isGameFinished) {
        await tx.game.update({
          where: { id: gameId },
          data: {
            status: nextStatus,
            completedAt: new Date(),
          },
        });
      }
    });
 
  var rsta: AttemptResponse = {
    feedback: currentFeedback,
    gameStatus: nextStatus,
    secretCode: isGameFinished
      ? (game.challenge.secretCode as MastermindColor[])
      : undefined,
  };
  return rsta;
}


function ifAttemptNotExistThrow(attempts: Attempt[], attemptKey: string) {
  //validate attemps is not  processed for idempotency
  var attemptAlreadyProcesed = attempts.some(
    (e) => e.submissionId == attemptKey
  );

  if (attemptAlreadyProcesed) throw new Error("Attempt already exist");
}
async function findGameOrThrow(gameId: string): Promise<GameWithRelations> {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { challenge: true, attempts: true },
  });

  if (!game) throw new Error("Game not found");
  return game;
}
function isVictory(code: FeedbackStatus[]): boolean {
  let isVictory: boolean = code.every((e) => e == "MATCH");
  return isVictory;
}
