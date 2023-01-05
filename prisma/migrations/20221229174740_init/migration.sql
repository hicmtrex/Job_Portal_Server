/*
  Warnings:

  - You are about to alter the column `salary` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "salary" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
