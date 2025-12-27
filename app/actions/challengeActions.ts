"use server";
import { MastermindColor } from "@/lib/game/types";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { Challenge, ChallengeType, Prisma } from "@prisma/client";
import { GAME_ERRORS } from "../constants/errorMessages";
import { ERRORS_GENERIC } from "../constants/errorGeneric";
import { getChallengeById } from "@/lib/challege/service";

interface ChallengeConfig {
  secret?: MastermindColor[];
  originalGameId?: string;
  isGhostVisible: boolean;
}
// 2. Creamos un tipo que extiende el Challenge de Prisma pero sobrescribe 'config'
export type ChallengeWithConfig = Omit<Challenge, "config"> & {
  config: ChallengeConfig;
};
/*
export const createCreatorChallengeAction = async (

  secret: MastermindColor[]
): Promise<string> => {
  const config = createCreatorPayload(secret);

  const challengeId = await createChallenge(
    userId,
    ChallengeType.CREATOR,
    config
  );
  return challengeId;
};*/

export const createGhostChallengeAction = async (
  gameId: string
): Promise<string> => {
  const config = createGhostPayload(gameId);
  const { user } = await createClient();
  const userId: string | null = user?.id || null;
  if (!userId) {
    throw new Error(GAME_ERRORS.AUTH_REQUIRED);
  }
  console.log("User ID:", userId);
  const challengeId = await createChallenge(
    userId,
    ChallengeType.GHOST,
    config
  );
  return challengeId;
};
async function createChallenge(
  userId: string,
  type: ChallengeType,
  config: ChallengeConfig
): Promise<string> {
  try {
    const challenge = await prisma.challenge.create({
      data: {
        challengerId: userId,
        type: type,
        config: config as unknown as Prisma.InputJsonValue,
      },
    });
    return challenge.id;
  } catch (err) {
    throw new Error(ERRORS_GENERIC.GENERIC);
  }
}

function createGhostPayload(
  originalGameId: string,
  isVisible: boolean = true
): ChallengeConfig {
  return {
    originalGameId,
    isGhostVisible: isVisible,
  };
}


export const getChallenge = async (
  challengeId: string
): Promise<ChallengeWithConfig> => {
  return getChallengeById(challengeId);
};
