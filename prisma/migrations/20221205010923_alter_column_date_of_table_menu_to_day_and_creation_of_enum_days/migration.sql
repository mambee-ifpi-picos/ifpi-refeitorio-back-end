/*
  Warnings:

  - You are about to drop the column `date` on the `menu ` table. All the data in the column will be lost.
  - Added the required column `day` to the `menu ` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Days" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- AlterTable
ALTER TABLE "menu " DROP COLUMN "date",
ADD COLUMN     "day" "Days" NOT NULL;
