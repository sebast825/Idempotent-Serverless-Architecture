"use server";
import { ERRORS_GENERIC } from "@/constants/errorGeneric";
import { getGamesWithAttemptsByUserId } from "@/lib/game/service";
import { GameWithAttempts } from "@/lib/game/types";
import { UserStats } from "@/lib/stats/types";
import { getStatsFromGames } from "@/lib/stats/utils";
import { createClient } from "@/lib/supabase/server";

export const getUserStats = async (): Promise<UserStats> => {
  const { user } = await createClient();
  if (user == null) throw new Error(ERRORS_GENERIC.AUTH_REQUIRED);

  const gamesWithAttempts: GameWithAttempts[] =
    await getGamesWithAttemptsByUserId(user.id);

  return getStatsFromGames(gamesWithAttempts);
};
