/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `DailyGameHistory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyGameHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyGameId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "DailyGameHistory_dailyGameId_fkey" FOREIGN KEY ("dailyGameId") REFERENCES "DailyGame" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DailyGameHistory" ("dailyGameId", "date", "id") SELECT "dailyGameId", "date", "id" FROM "DailyGameHistory";
DROP TABLE "DailyGameHistory";
ALTER TABLE "new_DailyGameHistory" RENAME TO "DailyGameHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
