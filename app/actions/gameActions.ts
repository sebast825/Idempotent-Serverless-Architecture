"use server";

import { generateSecretCode } from "@/lib/game/engine";
import {
  FeedbackStatus,
  GameWithAttempts,
  GameWithAttemptsAndPuzzle,
  MastermindColor,
} from "@/lib/game/types";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { GAME_ERRORS } from "../constants/errorMessages";
import { Game } from "@prisma/client";
import { getGameById } from "@/lib/game/service";
import { Console } from "console";

export async function createPuzzleGameAction(): Promise<string> {
  const { user } = await createClient();
  const userId = user?.id || null;
  const secretCode: MastermindColor[] = generateSecretCode();

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

export const findBaseGame = async (
  gameId: string
): Promise<GameWithAttemptsAndPuzzle> => {
  console.log("findBaseGame", gameId)
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
  console.log("llama aca")
  var game: GameWithAttemptsAndPuzzle = await findBaseGame(gameId);
    const { user } = await createClient();
    //validate only owner can use the game if in playing state
    if(game.playerUserId!= user?.id &&game.status==="PLAYING"){
      throw new Error(GAME_ERRORS.AUTH_REQUIRED);
    }
  const { puzzle, ...restOfGame } = game;

  return restOfGame;
};

export const createGameAction = async (puzzleId:string,challengeId?:string): Promise<Game> => {
    const { user } = await createClient();

  const game : Game = await prisma.game.create({
    data: {
      puzzleId: puzzleId,
      playerUserId : user?.id || null,
      challengeId: challengeId || null
    },
  });
  return game;
};