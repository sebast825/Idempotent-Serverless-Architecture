"use server"
import { GAME_ERRORS } from "@/constants/errorMessages";
import { MastermindColor } from "@/lib/game/types";
import { createPuzzle } from "@/lib/puzzle/service";
import { createClient } from "@/lib/supabase/server";

export const createPuzzleAction = async (
  secretCode: MastermindColor[]
): Promise<string> => {
  const { user } = await createClient();
  if (!user) {
    throw new Error(GAME_ERRORS.AUTH_REQUIRED);
  }
  const puzzleId = await createPuzzle(user.id, secretCode);
  return puzzleId;
};
