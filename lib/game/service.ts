import { GAME_ERRORS } from "@/app/constants/errorMessages";
import prisma from "../prisma";
import {  GameWithAttemptsAndPuzzle } from "./types";
import { Game } from "@prisma/client";

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

export async function createGame(puzzleId:string,challengeId?:string,userId?:string): Promise<Game>{
   
     const game : Game = await prisma.game.create({
       data: {
         puzzleId: puzzleId,
         playerUserId : userId || null,
         challengeId: challengeId || null
       },
       
     });
     return game;
}

export async function createGameWithPuzzle(secretCode:string[],userId?:string): Promise<string>{

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


export async function getGamesPaginatedByUserId(userId: string, pageSize: number, skipAmount: number): Promise<Game[]> {
    const games: Game[] = await prisma.game.findMany({
       where: { playerUserId: userId },
       take: pageSize,
       skip: skipAmount,
     });
     return games;
}

export async function countGamesByUserId(userId: string): Promise<number> {
    const totalGames = await prisma.game.count({
       where: { playerUserId: userId },
     });
     return totalGames;
}