"use server";
import { validate } from "@/lib/game/engine";
import {
  AttemptResponse,
  FeedbackStatus,
  GameStatus,
  GameWithRelations,
  GhostAttemptResponse,
  MastermindColor,
} from "@/lib/game/types";
import { createClient } from "@/lib/supabase/server";
import { GAME_ERRORS } from "../../constants/errorMessages";
import {
  getGameWithRelationsById,
  persistAttemptAndResponse,
} from "@/lib/game/service";
import { addGhostAttemptIfExist } from "@/lib/game/ghostService";
import prisma from "@/lib/prisma";
import { Attempt } from "@prisma/client";

export async function submitGuessAction(
  guessAttempt: MastermindColor[],
  gameId: string,
  attemptKey: string
): Promise<GhostAttemptResponse> {
  return await prisma.$transaction(async (tx) => {
    const game: GameWithRelations = await getGameWithRelationsById(gameId, tx);
    const { user } = await createClient();
    //validate only owner can use add attempts
    if (game.playerUserId != user?.id) {
      throw new Error(GAME_ERRORS.AUTH_REQUIRED);
    }
    let baseResponse: AttemptResponse;
    const existingAttempt: Attempt | undefined = game.attempts.find(
      (e) => e.submissionId == attemptKey
    );
    //if the game already exist we don't process it as a new one
    if (existingAttempt) {
      const gameStatus: GameStatus = game.status as GameStatus;
      baseResponse =  {
        feedback: existingAttempt.result as FeedbackStatus[],
        gameStatus: gameStatus,
        secretCode:
          gameStatus != "PLAYING"
            ? (game.puzzle.secretCode as MastermindColor[])
            : undefined,
      };
    } else {
      //validate guessAttempt with the secret
      const currentFeedback = validate(
        game.puzzle.secretCode as MastermindColor[],
        guessAttempt
      );
      baseResponse = await persistAttemptAndResponse(
        currentFeedback,
        game,
        gameId,
        attemptKey,
        guessAttempt,
        tx
      );
    }

    if (game.challenge?.isGhost && game.challenge.challengerGameId) {
      const attemptsToSkip = game.attempts.length;
      const ghostResponse = await addGhostAttemptIfExist(
        baseResponse,
        game.challenge.challengerGameId,
        attemptsToSkip,
        tx
      );
      return ghostResponse;
    }
    return baseResponse;
  });
}
