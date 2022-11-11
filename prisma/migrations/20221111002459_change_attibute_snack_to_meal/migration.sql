/*
  Warnings:

  - You are about to drop the column `snack` on the `menu ` table. All the data in the column will be lost.
  - Added the required column `meal` to the `menu ` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu " DROP COLUMN "snack",
ADD COLUMN     "meal" TEXT NOT NULL;
