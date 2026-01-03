import prisma from "../prisma";
import { AttemptResponse, GhostAttemptResponse, FeedbackStatus, MastermindColor } from "./types";

export const addGhostAttemptIfExist = async (
  baseResponse: AttemptResponse,
  challengerGameId: string,
  turnIndex: number
): Promise<GhostAttemptResponse> => {
  var attempt = await prisma.attempt.findFirst({
    where: { gameId: challengerGameId },
    orderBy: { createdAt: "asc" },
     skip: turnIndex,
  });
  if (!attempt) return baseResponse;
    return {
    ...baseResponse,
    ghostAttempt: {
      ...attempt,
      result: attempt?.result as FeedbackStatus[],
      guess: attempt.guess as MastermindColor[],
    },
  };
};
