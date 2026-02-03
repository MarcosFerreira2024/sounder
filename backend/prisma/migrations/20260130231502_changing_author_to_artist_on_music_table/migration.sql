/*
  Warnings:

  - You are about to drop the column `authorId` on the `Music` table. All the data in the column will be lost.
  - Added the required column `artistId` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Music" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "albumId" TEXT,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "lyrics" TEXT NOT NULL,
    CONSTRAINT "Music_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Music_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Music" ("albumId", "audio", "id", "likeCount", "lyrics", "name") SELECT "albumId", "audio", "id", "likeCount", "lyrics", "name" FROM "Music";
DROP TABLE "Music";
ALTER TABLE "new_Music" RENAME TO "Music";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
