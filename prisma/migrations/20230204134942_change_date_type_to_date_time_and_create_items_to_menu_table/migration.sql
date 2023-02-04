/*
  Warnings:

  - You are about to drop the column `creationDate` on the `items` table. All the data in the column will be lost.
  - Changed the type of `date` on the `menu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "creationDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "menu" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
