/*
  Warnings:

  - The values [GHOST,CREATOR] on the enum `ChallengeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `config` on the `Challenge` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[puzzleId]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[challengerGameId]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `puzzleId` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChallengeType_new" AS ENUM ('SYSTEM', 'CUSTOM');
ALTER TABLE "Challenge" ALTER COLUMN "type" TYPE "ChallengeType_new" USING ("type"::text::"ChallengeType_new");
ALTER TYPE "ChallengeType" RENAME TO "ChallengeType_old";
ALTER TYPE "ChallengeType_new" RENAME TO "ChallengeType";
DROP TYPE "ChallengeType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "config",
ADD COLUMN     "challengerGameId" TEXT,
ADD COLUMN     "isGhost" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "puzzleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_puzzleId_key" ON "Challenge"("puzzleId");

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_challengerGameId_key" ON "Challenge"("challengerGameId");

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengerGameId_fkey" FOREIGN KEY ("challengerGameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
