-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("registration")
);

-- CreateTable
CREATE TABLE "Absence" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "observation" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
