import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import {
  AttemptResponse,
  GhostAttemptResponse,
  FeedbackStatus,
  MastermindColor,
  FormattedAttempt,
} from "./types";

export const addGhostAttemptIfExist = async (
  baseResponse: AttemptResponse,
  challengerGameId: string,
  turnIndex: number,
  tx: Prisma.TransactionClient
): Promise<GhostAttemptResponse> => {
  const attempt = await tx.attempt.findFirst({
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

export const getAttemptsByChallengerGameId = async (
  challengerGameId: string,
  limit: number
): Promise<FormattedAttempt[]> => {
  const attempts = await prisma.attempt.findMany({
    where: { gameId: challengerGameId },
    orderBy: { createdAt: "asc" },
    take: limit,
  });

  const formatedAttempts: FormattedAttempt[] = attempts.map((elem) => {
    return {
      ...elem,
      result: elem?.result as FeedbackStatus[],
      guess: elem?.guess as MastermindColor[],
    };
  });
  return formatedAttempts;
};
