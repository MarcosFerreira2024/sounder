/*
  Warnings:

  - Added the required column `artistName` to the `DailyGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audio` to the `DailyGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicName` to the `DailyGame` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyGame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "originalImage" TEXT NOT NULL,
    "blur100" TEXT NOT NULL,
    "blur75" TEXT NOT NULL,
    "blur50" TEXT NOT NULL,
    "blur25" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "musicName" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL
);
INSERT INTO "new_DailyGame" ("blur100", "blur25", "blur50", "blur75", "correctAnswer", "date", "id", "originalImage") SELECT "blur100", "blur25", "blur50", "blur75", "correctAnswer", "date", "id", "originalImage" FROM "DailyGame";
DROP TABLE "DailyGame";
ALTER TABLE "new_DailyGame" RENAME TO "DailyGame";
CREATE UNIQUE INDEX "DailyGame_date_key" ON "DailyGame"("date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
