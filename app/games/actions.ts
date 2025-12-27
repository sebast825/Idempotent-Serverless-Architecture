"use server";
import { MAX_ATTEMPTS } from "@/lib/game/config";
import { validate } from "@/lib/game/engine";
import {
  AttemptResponse,
  FeedbackStatus,
  GameStatus,
  MastermindColor,
} from "@/lib/game/types";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { Attempt, Prisma } from "@prisma/client";
import { GAME_ERRORS } from "../constants/errorMessages";

type GameWithRelations = Prisma.GameGetPayload<{
  include: {
    attempts: true;
    puzzle: true;
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
    game.puzzle.secretCode as MastermindColor[],
    guessAttempt
  );
  return persistAttemptAndResponse(
    currentFeedback,
    game,
    gameId,
    attemptKey,
    guessAttempt
  );
}

async function persistAttemptAndResponse(
  currentFeedback: FeedbackStatus[],
  game: GameWithRelations,
  gameId: string,
  attemptKey: string,
  guessAttempt: MastermindColor[]
) {
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
    //if game finished notifye challenger of challenge if exists
   if (nextStatus != "PLAYING" && game.challenge) {
      await tx.notification.create({
        data: {
          recipientId: game.challenge.challengerId,
          actorId: game.playerUserId,
          type: "CHALLENGE_COMPLETED",
          challengeId: game.challenge.id,
          gameId: game.id,
    }   
  })}

  });

  var rsta: AttemptResponse = {
    feedback: currentFeedback,
    gameStatus: nextStatus,
    secretCode: isGameFinished
      ? (game.puzzle.secretCode as MastermindColor[])
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
    include: { puzzle: true, attempts: true,challenge: true },
  });
  if (!game) throw new Error("Game not found");

  const { user } = await createClient();
  //validate only owner can use add attempts
  if (game.playerUserId != user?.id) {
    throw new Error(GAME_ERRORS.AUTH_REQUIRED);
  }
  return game;
}
function isVictory(code: FeedbackStatus[]): boolean {
  let isVictory: boolean = code.every((e) => e == "MATCH");
  return isVictory;
}
