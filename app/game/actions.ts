import { validate } from "@/lib/game/engine";
import { AttemptResponse, FeedbackStatus, GameStatus, MastermindColor } from "@/lib/game/types";
import prisma from "@/lib/prisma";
import {  Prisma} from "@prisma/client";

const MAX_ATTEMPTS = 1;

type GameWithRelations = Prisma.GameGetPayload<{
  include: { 
    attempts: true;
    challenge: true; 
  };
}>;


export async function submitGuessAction(
  guessAttempt: MastermindColor[],
  gameId: string,
  attemptKey: string
) : Promise<AttemptResponse>{
  //search game for db
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { challenge: true, attempts: true },
  });
  if (!game) throw new Error("Game not found");
  //validate attemps wasn't processed for idempotency
  var attemptAlreadyProcesed = game.attempts.some(
    (e) => e.submissionId == attemptKey
  );

  if (attemptAlreadyProcesed) throw new Error("Attempt already exist");
  //validate guessAttempt with the secret
  const currentFeedback = validate(
    game.challenge.secretCode as MastermindColor[],
    guessAttempt
  );
  await prisma.attempt.create({
    data: {
      gameId: game.id,
      submissionId: attemptKey,
      guess: guessAttempt,
      result: currentFeedback,
    },
  });
 return handleResponse(game,currentFeedback);
}


function handleResponse(game : GameWithRelations,currentFeedback :FeedbackStatus[] ): AttemptResponse{
 let response: AttemptResponse;
  
  //return response and win
  if (game.attempts.length > MAX_ATTEMPTS) {
    return (response = {
      feedback: currentFeedback,
      gameStatus: "LOST",
      secretCode: game.challenge.secretCode as MastermindColor[],
    });
  }
  if (isVictory(currentFeedback)) {
    return (response = {
      feedback: currentFeedback,
      gameStatus: "WON",
      secretCode: game.challenge.secretCode as MastermindColor[],
    });
  }
  return (response = {
    feedback: currentFeedback,
    gameStatus: "PLAYING",
  });
}

function isVictory(code: FeedbackStatus[]): boolean {
  let isVictory: boolean = code.every((e) => e == "MATCH");
  return isVictory;
}

