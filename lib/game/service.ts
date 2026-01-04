import { GAME_ERRORS } from "@/constants/errorMessages";
import prisma from "../prisma";
import {
  AttemptResponse,
  FeedbackStatus,
  GameStatus,
  GameWithAttemptsAndPuzzle,
  GameWithRelations,
  MastermindColor,
} from "./types";
import { Game, Prisma } from "@prisma/client";
import { MAX_ATTEMPTS } from "./config";
import { isVictory } from "./engine";

export async function getGameById(
  gameId: string
): Promise<GameWithAttemptsAndPuzzle> {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: { attempts: true, puzzle: true, challenge: true },
  });
  if (!game) {
    throw new Error(GAME_ERRORS.NOT_FOUND);
  }
  return game as unknown as GameWithAttemptsAndPuzzle;
}
export async function getGameWithRelationsById(
  gameId: string
): Promise<GameWithRelations> {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: { attempts: true, puzzle: true, challenge: true },
  });
  if (!game) {
    throw new Error(GAME_ERRORS.NOT_FOUND);
  }
  return game as unknown as GameWithRelations;
}
export async function getGamesWithAttemptsByUserId(
  userId: string
): Promise<GameWithAttemptsAndPuzzle[]> {
  return (await prisma.game.findMany({
    where: {
      playerUserId: userId,
    },
    include: {
      attempts: true,
    },
  })) as unknown as GameWithAttemptsAndPuzzle[];
}
export async function createGame(
  puzzleId: string,
  challengeId?: string,
  userId?: string
): Promise<Game> {
  const game: Game = await prisma.game.create({
    data: {
      puzzleId: puzzleId,
      playerUserId: userId || null,
      challengeId: challengeId || null,
    },
  });
  return game;
}

export async function createGameWithPuzzle(
  secretCode: string[],
  userId?: string
): Promise<string> {
  const gameId: string = await prisma.$transaction(async (tx) => {
    const puzzle = await tx.puzzle.create({
      data: {
        secretCode: secretCode,
        createdByUserId: userId,
      },
    });
    const game = await tx.game.create({
      data: {
        puzzleId: puzzle.id,
        playerUserId: userId,
      },
    });
    return game.id;
  });
  return gameId;
}

export async function getGamesPaginatedByUserId(
  userId: string,
  pageSize: number,
  skipAmount: number
): Promise<Game[]> {
  const games: Game[] = await prisma.game.findMany({
    where: { playerUserId: userId },
    orderBy: { createdAt: "desc" },
    take: pageSize,
    skip: skipAmount,
  });
  return games;
}

export async function countGamesByUserId(userId: string): Promise<number> {
  const totalGames = await prisma.game.count({
    where: { playerUserId: userId },
  });
  return totalGames;
}

export async function persistAttemptAndResponse(
  currentFeedback: FeedbackStatus[],
  game: GameWithRelations,
  gameId: string,
  attemptKey: string,
  guessAttempt: MastermindColor[]
) {
  const isVictoryState: boolean = isVictory(currentFeedback);
  const isLastAttempt: boolean = game.attempts.length + 1 >= MAX_ATTEMPTS;
  const isGameFinished: boolean = isVictoryState || isLastAttempt;
  const nextStatus: GameStatus = isVictoryState
    ? "WON"
    : isLastAttempt
    ? "LOST"
    : "PLAYING";

  await prisma.$transaction(async (tx) => {
    try {
      await tx.attempt.create({
        data: {
          gameId: game.id,
          submissionId: attemptKey,
          guess: guessAttempt,
          result: currentFeedback,
        },
      });
    } catch (err) {
      // Prisma unique constraint error
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code == "P2002"
      ) {
        // attempt already processed, handle
        return;
      }
      throw err;
    }
    //only update is game is finished
    if (isGameFinished) {
      await tx.game.update({
        where: { id: gameId },
        data: {
          status: nextStatus,
          completedAt: new Date(),
        },
      });
    }
    //if game finished notifye challenger of challenge if exists
    if (nextStatus != "PLAYING" && game.challenge) {
      await tx.notification.create({
        data: {
          recipientId: game.challenge.challengerId,
          actorId: game.playerUserId,
          type: "CHALLENGE_COMPLETED",
          challengeId: game.challenge.id,
          gameId: game.id,
        },
      });
    }
  });

  const rsta: AttemptResponse = {
    feedback: currentFeedback,
    gameStatus: nextStatus,
    secretCode: isGameFinished
      ? (game.puzzle.secretCode as MastermindColor[])
      : undefined,
  };
  return rsta;
}

export const assignPlayerToGame = async (gameId: string, userId: string) : Promise<Game> => {
   return await prisma.game.update({
    where: { id: gameId },
    data: { playerUserId: userId },
  });
};
