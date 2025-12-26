-- AlterTable
ALTER TABLE "Puzzle" ALTER COLUMN "createdByUserId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "playerUserId" DROP NOT NULL;
