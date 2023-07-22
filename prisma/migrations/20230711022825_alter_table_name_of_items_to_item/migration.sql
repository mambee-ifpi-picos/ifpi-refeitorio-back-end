/*
  Warnings:

  - You are about to drop the `_ItemsToMenu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemsToMenu" DROP CONSTRAINT "_ItemsToMenu_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemsToMenu" DROP CONSTRAINT "_ItemsToMenu_B_fkey";

-- DropTable
DROP TABLE "_ItemsToMenu";

-- DropTable
DROP TABLE "items";

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToMenu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "item_name_key" ON "item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToMenu_AB_unique" ON "_ItemToMenu"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToMenu_B_index" ON "_ItemToMenu"("B");

-- AddForeignKey
ALTER TABLE "_ItemToMenu" ADD CONSTRAINT "_ItemToMenu_A_fkey" FOREIGN KEY ("A") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToMenu" ADD CONSTRAINT "_ItemToMenu_B_fkey" FOREIGN KEY ("B") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
