/*
  Warnings:

  - You are about to drop the `MusicAlbum` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MusicAlbum";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Album_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DailyGame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "originalImage" TEXT NOT NULL,
    "blur100" TEXT NOT NULL,
    "blur75" TEXT NOT NULL,
    "blur50" TEXT NOT NULL,
    "blur25" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyGameId" TEXT,
    CONSTRAINT "Game_dailyGameId_fkey" FOREIGN KEY ("dailyGameId") REFERENCES "DailyGame" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserGame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "tries" INTEGER NOT NULL,
    "correctAnswer" BOOLEAN,
    CONSTRAINT "UserGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserGameStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gamemodeId" TEXT NOT NULL,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "matches" INTEGER NOT NULL DEFAULT 0,
    "loses" INTEGER NOT NULL DEFAULT 0,
    "timePlayed" INTEGER NOT NULL DEFAULT 0,
    "winPercent" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "UserGameStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserGameStatus_gamemodeId_fkey" FOREIGN KEY ("gamemodeId") REFERENCES "GameMode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameMode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "DailyGameHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyGameId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    CONSTRAINT "DailyGameHistory_dailyGameId_fkey" FOREIGN KEY ("dailyGameId") REFERENCES "DailyGame" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Music" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "albumId" TEXT,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "lyrics" TEXT NOT NULL,
    CONSTRAINT "Music_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Music_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Music" ("albumId", "audio", "authorId", "id", "likeCount", "lyrics", "name") SELECT "albumId", "audio", "authorId", "id", "likeCount", "lyrics", "name" FROM "Music";
DROP TABLE "Music";
ALTER TABLE "new_Music" RENAME TO "Music";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "DailyGame_date_key" ON "DailyGame"("date");

-- CreateIndex
CREATE UNIQUE INDEX "GameMode_name_key" ON "GameMode"("name");
