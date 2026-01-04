"use server";
import { validate } from "@/lib/game/engine";
import {
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
import { ifAttemptNotExistThrow } from "@/lib/game/validations";
import { addGhostAttemptIfExist } from "@/lib/game/ghostService";

export async function submitGuessAction(
  guessAttempt: MastermindColor[],
  gameId: string,
  attemptKey: string
): Promise<GhostAttemptResponse> {
  const game: GameWithRelations = await getGameWithRelationsById(gameId);
  const { user } = await createClient();
  //validate only owner can use add attempts
  if (game.playerUserId != user?.id) {
    throw new Error(GAME_ERRORS.AUTH_REQUIRED);
  }
  ifAttemptNotExistThrow(game.attempts, attemptKey);

  //validate guessAttempt with the secret
  const currentFeedback = validate(
    game.puzzle.secretCode as MastermindColor[],
    guessAttempt
  );
  const baseResponse = await persistAttemptAndResponse(
    currentFeedback,
    game,
    gameId,
    attemptKey,
    guessAttempt
  );

  if(game.challenge?.isGhost && game.challenge.challengerGameId){
    const attemptsToSkip = game.attempts.length
    const ghostResponse =  await addGhostAttemptIfExist(baseResponse,game.challenge.challengerGameId, attemptsToSkip)  
    return ghostResponse;
  }
  return baseResponse;
}


