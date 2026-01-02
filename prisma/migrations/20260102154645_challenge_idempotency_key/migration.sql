/*
  Warnings:

  - A unique constraint covering the columns `[submissionId]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `submissionId` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "submissionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_submissionId_key" ON "Challenge"("submissionId");
