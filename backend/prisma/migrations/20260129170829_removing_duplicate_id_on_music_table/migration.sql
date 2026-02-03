/*
  Warnings:

  - You are about to drop the column `author_id` on the `Music` table. All the data in the column will be lost.

*/
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
    CONSTRAINT "Music_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Music" ("albumId", "audio", "authorId", "id", "likeCount", "lyrics", "name") SELECT "albumId", "audio", "authorId", "id", "likeCount", "lyrics", "name" FROM "Music";
DROP TABLE "Music";
ALTER TABLE "new_Music" RENAME TO "Music";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
