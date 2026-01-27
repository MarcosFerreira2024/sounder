/*
  Warnings:

  - You are about to drop the column `liked` on the `MusicAction` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MusicAction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "reaction" TEXT NOT NULL DEFAULT 'NONE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "musicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "MusicAction_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MusicAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MusicAction" ("createdAt", "id", "musicId", "updatedAt", "userId", "viewed") SELECT "createdAt", "id", "musicId", "updatedAt", "userId", "viewed" FROM "MusicAction";
DROP TABLE "MusicAction";
ALTER TABLE "new_MusicAction" RENAME TO "MusicAction";
CREATE INDEX "MusicAction_musicId_idx" ON "MusicAction"("musicId");
CREATE INDEX "MusicAction_userId_idx" ON "MusicAction"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
