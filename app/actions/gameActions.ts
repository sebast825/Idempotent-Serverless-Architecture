"use server"

import { generateSecretCode } from "@/lib/game/engine";
import { MastermindColor } from "@/lib/game/types";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function createChallengeGameAction() : Promise<string>{
  const { user } = await createClient();
  const userId = user?.id || null;
  const secretCode: MastermindColor[] = generateSecretCode();

  const gameId : string = await prisma.$transaction(async (tx) => {
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
