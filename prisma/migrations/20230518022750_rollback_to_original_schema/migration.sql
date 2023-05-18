-- CreateEnum
CREATE TYPE "Seasons" AS ENUM ('Spring', 'Summer', 'Fall');

-- CreateEnum
CREATE TYPE "Grades" AS ENUM ('A', 'B', 'C', 'D', 'F', 'Q');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "season" "Seasons" NOT NULL,
    "year" INTEGER NOT NULL,
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    "C" INTEGER NOT NULL,
    "D" INTEGER NOT NULL,
    "F" INTEGER NOT NULL,
    "Q" INTEGER NOT NULL,
    "userId" TEXT,
    "professorId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor_Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER,
    "comments" TEXT,
    "likability" INTEGER,
    "attendance_required" BOOLEAN,
    "responsiveness" INTEGER,
    "userId" TEXT NOT NULL,
    "professorId" TEXT,
    "courseId" TEXT,

    CONSTRAINT "Professor_Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course_Review" (
    "id" TEXT NOT NULL,
    "season" "Seasons" NOT NULL,
    "year" INTEGER NOT NULL,
    "grade" "Grades",
    "rating" INTEGER NOT NULL,
    "textbook" BOOLEAN,
    "comments" TEXT,
    "hw_hours" INTEGER,
    "attendance_required" BOOLEAN,
    "take_again" BOOLEAN,
    "difficulty" INTEGER,
    "userId" TEXT NOT NULL,
    "courseId" TEXT,
    "professorId" TEXT NOT NULL,

    CONSTRAINT "Course_Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_id_key" ON "Professor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_Review_id_key" ON "Professor_Review"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_Review_userId_key" ON "Professor_Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_Review_id_key" ON "Course_Review"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_Review_userId_key" ON "Course_Review"("userId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor_Review" ADD CONSTRAINT "Professor_Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor_Review" ADD CONSTRAINT "Professor_Review_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor_Review" ADD CONSTRAINT "Professor_Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_Review" ADD CONSTRAINT "Course_Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_Review" ADD CONSTRAINT "Course_Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_Review" ADD CONSTRAINT "Course_Review_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
