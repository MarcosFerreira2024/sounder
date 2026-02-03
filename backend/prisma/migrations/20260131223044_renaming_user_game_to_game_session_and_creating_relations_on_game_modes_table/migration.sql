/*
  Warnings:

  - You are about to drop the `UserGame` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gamemodeId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserGame_userId_gameId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserGame";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "tries" INTEGER NOT NULL DEFAULT 0,
    "correctAnswer" BOOLEAN,
    CONSTRAINT "GameSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameSession_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gamemodeId" TEXT NOT NULL,
    "dailyGameId" TEXT,
    CONSTRAINT "Game_gamemodeId_fkey" FOREIGN KEY ("gamemodeId") REFERENCES "GameMode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_dailyGameId_fkey" FOREIGN KEY ("dailyGameId") REFERENCES "DailyGame" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("dailyGameId", "id") SELECT "dailyGameId", "id" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_userId_gameId_key" ON "GameSession"("userId", "gameId");
