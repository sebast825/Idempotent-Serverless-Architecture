"use server";

import { generateSecretCode } from "@/lib/game/engine";
import { FeedbackStatus, GameWithAttempts, MastermindColor } from "@/lib/game/types";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { Game, Prisma } from "@prisma/client";

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

//use this fn in case user refresj te window has access to the same game
export const findExistingGame = async (
  gameId: string
): Promise<GameWithAttempts | null> => {
  const { user } = await createClient();
  if (!user) return null;
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
      playerUserId: user.id,
    },
    include: { attempts: true },
  });
  if (!game) return null;
  // Transform attempt to be usable
  const formattedAttempts = game.attempts.map((attempt) => ({
    ...attempt,
    guess: attempt.guess as MastermindColor[],
    results: attempt.result as FeedbackStatus[],
  }));
  return {
    ...game,
    attempts: formattedAttempts,
  } as GameWithAttempts;
};
