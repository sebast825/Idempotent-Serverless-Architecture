import { GAME_ERRORS } from "@/app/constants/errorMessages";
import prisma from "../prisma";
import {  GameWithAttemptsAndPuzzle } from "./types";

export async function getGameById(gameId: string) : Promise<GameWithAttemptsAndPuzzle> {
    const game = await prisma.game.findUnique({
       where: {
         id: gameId    
       },
       include: { attempts: true, puzzle: true },
     });
     if (!game) {
       throw new Error(GAME_ERRORS.NOT_FOUND);
     }
return game as unknown as GameWithAttemptsAndPuzzle;
}