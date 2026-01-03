"use server";
import { createChallenge, getChallengeById } from "@/lib/challege/service";
import { ChallengeConfig } from "@/lib/challege/types";
import { createClient } from "@/lib/supabase/server";
import { Challenge, ChallengeType } from "@prisma/client";
import { GAME_ERRORS } from "../../constants/errorMessages";

// 2. Creamos un tipo que extiende el Challenge de Prisma pero sobrescribe 'config'
export type ChallengeWithConfig = Omit<Challenge, "config"> & {
  config: ChallengeConfig;
};

export const createCustomChallengeAction = async (

  puzzleId: string,
  idempotencyKey:string
): Promise<string> => {
    const { user } = await createClient();
  if (!user) {
    throw new Error(GAME_ERRORS.AUTH_REQUIRED);
  }


  const challengeId = await createChallenge(
    user.id,
    ChallengeType.CUSTOM,
    puzzleId,
    idempotencyKey
    
  );
  return challengeId;
};

export const createSystemChallengeAction = async (
  gameId: string,
  puzzleId:string,
  idempotencyKey:string,
  isGhost:boolean=false
): Promise<string> => {
 // const config = createGhostPayload(gameId);
  const { user } = await createClient();
  const userId: string | null = user?.id || null;
  if (!userId) {
    throw new Error(GAME_ERRORS.AUTH_REQUIRED);
  }
  const challengeId = await createChallenge(
    userId,
    ChallengeType.SYSTEM,
    puzzleId,
    idempotencyKey,
    gameId,
    isGhost
  );
  return challengeId;
};

export const getChallenge = async (
  challengeId: string
): Promise<ChallengeWithConfig> => {
  return getChallengeById(challengeId);
};
