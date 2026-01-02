import { ChallengeWithConfig } from "@/app/actions/challengeActions";
import { GAME_ERRORS } from "@/constants/errorMessages";
import { Challenge, ChallengeType, Prisma } from "@prisma/client";
import prisma from "../prisma";
import { ERRORS_GENERIC } from "@/constants/errorGeneric";
import { ChallengeConfig } from "./types";

export async function getChallengerIdFromChallenge(
  challengeId: string
): Promise<string> {
  const rsta = await prisma.challenge.findUnique({
    where: {
      id: challengeId,
    },
    select: {
      challengerId: true,
    },
  });
  if (!rsta) {
    throw new Error("Challenger Id not found");
  }
  return rsta.challengerId;
}

export const getChallengeById = async (
  challengeId: string
): Promise<ChallengeWithConfig> => {
  const challenge: Challenge | null = await prisma.challenge.findUnique({
    where: {
      id: challengeId,
    },
  });
  if (!challenge) {
    throw new Error(GAME_ERRORS.NOT_FOUND);
  }
  return challenge as unknown as ChallengeWithConfig;
};

export async function createChallenge(
  userId: string,
  type: ChallengeType,
  puzzleId: string,
  idempotencyKey: string,
  gameId?: string
): Promise<string> {
  try {
    const challenge = await prisma.challenge.create({
      data: {
        challengerId: userId,
        type: type,
        puzzleId: puzzleId,
        challengerGameId: gameId,
        submissionId: idempotencyKey,
      },
    });
    return challenge.id;
  } catch (err: any) {
    //this is the code from supabase when a unic key already exist
    if (err.code == "P2002") {
      const existingChallenge = await prisma.challenge.findUnique({
        where: { submissionId: idempotencyKey },
        select: { id: true },
      });
      console.log("existe; ", existingChallenge);
      if (existingChallenge) return existingChallenge.id;
    }

    throw new Error(ERRORS_GENERIC.GENERIC);
  }
}
