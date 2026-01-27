/*
  Warnings:

  - A unique constraint covering the columns `[musicId,userId]` on the table `MusicAction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MusicAction_musicId_userId_key" ON "MusicAction"("musicId", "userId");
