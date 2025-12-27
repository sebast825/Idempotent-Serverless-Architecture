"use server";

import {
  countGamesByUserId,
  getGamesPaginatedByUserId,
} from "@/lib/game/service";
import { createClient } from "@/lib/supabase/server";
import { PaginatedResponse } from "@/lib/types/commonTypes";
import { Game } from "@prisma/client";


export const getPaginatedGamesByUser = async (
  currentPage: number,
  pageSize: number
): Promise<PaginatedResponse<Game>> => {
  const { user } = await createClient();
  if (user == null) throw new Error("User not authenticated");

  currentPage = currentPage < 1 ? 0 : currentPage - 1;
  const skipAmount = currentPage * pageSize;

  const games: Game[] = await getGamesPaginatedByUserId(
    user.id,
    pageSize,
    skipAmount
  );
  const totalGames = await countGamesByUserId(user.id);
  const rsta: PaginatedResponse<Game> = {
    data: games,
    currentPage: currentPage,
    totalPages: Math.ceil(totalGames / pageSize),
    itemsPerPage: pageSize,
  };
  return rsta;
};
