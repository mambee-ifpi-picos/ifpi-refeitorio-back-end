/*
  Warnings:

  - You are about to drop the `menu ` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "menu ";

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "meal" TEXT NOT NULL,
    "day" "Days" NOT NULL,
    "items" TEXT NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "items_name_key" ON "items"("name");
