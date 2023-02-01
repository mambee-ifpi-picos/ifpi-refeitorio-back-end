/*
  Warnings:

  - You are about to drop the column `day` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `menu` table. All the data in the column will be lost.
  - Added the required column `date` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu" DROP COLUMN "day",
DROP COLUMN "items",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "Days";

-- CreateTable
CREATE TABLE "_ItemsToMenu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemsToMenu_AB_unique" ON "_ItemsToMenu"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemsToMenu_B_index" ON "_ItemsToMenu"("B");

-- AddForeignKey
ALTER TABLE "_ItemsToMenu" ADD CONSTRAINT "_ItemsToMenu_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemsToMenu" ADD CONSTRAINT "_ItemsToMenu_B_fkey" FOREIGN KEY ("B") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
