"use server";

import { generateSecretCode } from "@/lib/game/engine";
import {
  FeedbackStatus,
  GameWithAttempts,
  GameWithAttemptsAndChallenge,
  MastermindColor,
} from "@/lib/game/types";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { GAME_ERRORS } from "../constants/errorMessages";

export async function createChallengeGameAction(): Promise<string> {
  const { user } = await createClient();
  const userId = user?.id || null;
  const secretCode: MastermindColor[] = generateSecretCode();

  const gameId: string = await prisma.$transaction(async (tx) => {
    const challenge = await tx.challenge.create({
      data: {
        secretCode: secretCode,
        createdByUserId: userId,
      },
    });
    const game = await tx.game.create({
      data: {
        challengeId: challenge.id,
        playerUserId: userId,
      },
    });
    return game.id;
  });
  return gameId;
}

export const findBaseGame = async (
  gameId: string
): Promise<GameWithAttemptsAndChallenge> => {
  const { user } = await createClient();
  if (!user) throw new Error(GAME_ERRORS.AUTH_REQUIRED);
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
      playerUserId: user.id,
    },
    include: { attempts: true, challenge: true },
  });
  if (!game) {
    throw new Error(GAME_ERRORS.NOT_FOUND);
  }
  // Transform attempt to be usable
  const formattedAttempts = game.attempts.map((attempt) => ({
    ...attempt,
    guess: attempt.guess as MastermindColor[],
    results: attempt.result as FeedbackStatus[],
  }));
  return {
    ...game,
    attempts: formattedAttempts,
  } as GameWithAttemptsAndChallenge;
};

//remove challenge resolution
//use this fn for in progres games to reload and remain the history
export const findExistingGame = async (
  gameId: string
): Promise<GameWithAttempts> => {
  var game: GameWithAttemptsAndChallenge = await findBaseGame(gameId);
  const { challenge, ...restOfGame } = game;

  return restOfGame;
};
