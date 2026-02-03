/*
  Warnings:

  - A unique constraint covering the columns `[gamemodeId,userId]` on the table `UserGameStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserGameStatus_gamemodeId_userId_key" ON "UserGameStatus"("gamemodeId", "userId");
