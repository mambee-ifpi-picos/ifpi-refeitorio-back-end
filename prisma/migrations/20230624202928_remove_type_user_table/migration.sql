/*
  Warnings:

  - You are about to drop the column `typeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `TypeUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_typeId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "typeId",
ADD COLUMN     "type" INTEGER NOT NULL,
ALTER COLUMN "course" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;

-- DropTable
DROP TABLE "TypeUser";
