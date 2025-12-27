import { ChallengeWithConfig } from "@/app/actions/challengeActions";
import { GAME_ERRORS } from "@/app/constants/errorMessages";
import { Challenge } from "@prisma/client";
import prisma from "../prisma";

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
