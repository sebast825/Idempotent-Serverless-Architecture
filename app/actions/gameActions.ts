"use server";

import { generateSecretCode } from "@/lib/game/engine";
import {
  FeedbackStatus,
  GameWithAttempts,
  GameWithAttemptsAndPuzzle,
  MastermindColor,
} from "@/lib/game/types";
import { createClient } from "@/lib/supabase/server";
import { GAME_ERRORS } from "../constants/errorMessages";
import { Game } from "@prisma/client";
import {
  createGame,
  createGameWithPuzzle,
  getGameById,
} from "@/lib/game/service";

export async function createPuzzleGameAction(): Promise<string> {
  const { user } = await createClient();
  const secretCode: MastermindColor[] = generateSecretCode();

  const gameId: string = await createGameWithPuzzle(secretCode, user?.id);
  return gameId;
}

export const getGameFormated = async (
  gameId: string
): Promise<GameWithAttemptsAndPuzzle> => {
  console.log("findBaseGame", gameId);
  const game = await getGameById(gameId);
  // Transform attempt to be usable
  const formattedAttempts = game.attempts.map((attempt) => ({
    ...attempt,
    guess: attempt.guess as MastermindColor[],
    results: attempt.result as FeedbackStatus[],
  }));
  return {
    ...game,
    attempts: formattedAttempts,
  } as GameWithAttemptsAndPuzzle;
};

//remove puzzle resolution
//use this fn for in progres games to reload and remain the history
export const findExistingGame = async (
  gameId: string
): Promise<GameWithAttempts> => {
  var game: GameWithAttemptsAndPuzzle = await getGameFormated(gameId);
  const { user } = await createClient();
  //validate only owner can use the game if in playing state
  if (game.playerUserId != user?.id && game.status === "PLAYING") {
    throw new Error(GAME_ERRORS.AUTH_REQUIRED);
  }
  const { puzzle, ...restOfGame } = game;

  return restOfGame;
};

export const createGameAction = async (
  puzzleId: string,
  challengeId?: string
): Promise<Game> => {
  const { user } = await createClient();
  return createGame(puzzleId, challengeId, user?.id);
};
