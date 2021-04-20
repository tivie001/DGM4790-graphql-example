/*
  Warnings:

  - You are about to drop the column `watched` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `vote` on the `Movie` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Watchlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "releaseDate" DATETIME,
    "watched" BOOLEAN
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "releaseDate" DATETIME
);
INSERT INTO "new_Movie" ("id", "title", "description", "image", "releaseDate") SELECT "id", "title", "description", "image", "releaseDate" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie.title_unique" ON "Movie"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist.title_unique" ON "Watchlist"("title");
