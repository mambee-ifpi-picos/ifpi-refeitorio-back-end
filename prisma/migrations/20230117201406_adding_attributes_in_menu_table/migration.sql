-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "description" TEXT,
ADD COLUMN     "state" BOOLEAN NOT NULL DEFAULT true;
