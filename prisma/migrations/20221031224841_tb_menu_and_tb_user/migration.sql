-- CreateTable
CREATE TABLE "menu " (
    "id" SERIAL NOT NULL,
    "snack" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "items" TEXT NOT NULL,

    CONSTRAINT "menu _pkey" PRIMARY KEY ("id")
);
