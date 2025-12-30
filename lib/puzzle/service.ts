import prisma from "../prisma"

export const createPuzzle = async (userId: string, secretCode: string[]) : Promise<string> =>{
   const puzzle = await prisma.puzzle.create({
      data:{
         secretCode: secretCode,
         createdByUserId: userId
      }
   })
   return puzzle.id;
}