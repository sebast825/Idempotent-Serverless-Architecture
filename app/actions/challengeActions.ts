"use server";
import { createClient } from "@/lib/supabase/server";
import { Challenge, ChallengeType } from "@prisma/client";
import { GAME_ERRORS } from "../../constants/errorMessages";
import { createChallenge, getChallengeById } from "@/lib/challege/service";
import { ChallengeConfig } from "@/lib/challege/types";
import { createGhostPayload } from "@/lib/challege/utils";

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
  gameId: string,
  puzzleId:string
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
    gameId
  );
  return challengeId;
};

export const getChallenge = async (
  challengeId: string
): Promise<ChallengeWithConfig> => {
  return getChallengeById(challengeId);
};
