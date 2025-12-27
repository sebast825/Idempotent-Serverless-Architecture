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
