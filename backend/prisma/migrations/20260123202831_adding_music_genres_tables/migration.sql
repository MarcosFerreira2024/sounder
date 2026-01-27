-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MusicGenre" (
    "musicId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,
    CONSTRAINT "MusicGenre_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MusicGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE INDEX "MusicGenre_musicId_idx" ON "MusicGenre"("musicId");

-- CreateIndex
CREATE INDEX "MusicGenre_genreId_idx" ON "MusicGenre"("genreId");

-- CreateIndex
CREATE UNIQUE INDEX "MusicGenre_musicId_genreId_key" ON "MusicGenre"("musicId", "genreId");
