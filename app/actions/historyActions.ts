"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { Game } from "@prisma/client";


export interface PaginatedResponse<T> {
  data: T[];

  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}
export const getPaginatedGamesByUser = async (
  currentPage: number,
  pageSize : number
): Promise<PaginatedResponse<Game>> => {
  
  const { user } = await createClient();
  if (user == null) throw new Error("User not authenticated");
  const userId = user?.id || null;

  currentPage = currentPage < 1 ? 0 : currentPage - 1;
  const skipAmount = currentPage * pageSize;

  const games: Game[] = await prisma.game.findMany({
    where: { playerUserId: userId! },
    take: pageSize,
    skip: skipAmount,
  });
  const totalGames = await prisma.game.count({
    where: { playerUserId: userId },
  });
  const rsta: PaginatedResponse<Game> = {
    data: games,
    currentPage: currentPage,
    totalPages: Math.ceil(totalGames/pageSize),
    itemsPerPage: pageSize,
  };
  return rsta;
};
