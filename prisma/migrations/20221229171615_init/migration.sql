-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'success', 'rejected');

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,
    "location" TEXT NOT NULL,
    "jobNature" TEXT NOT NULL,
    "applicationDate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requiredKnowledge" TEXT[],
    "experience" TEXT[],
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Apply" (
    "id" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_id_key" ON "Job"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Apply_id_key" ON "Apply"("id");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apply" ADD CONSTRAINT "Apply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apply" ADD CONSTRAINT "Apply_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
