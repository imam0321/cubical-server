/*
  Warnings:

  - The `isActive` column on the `organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrganizationStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED', 'BLOCKED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "isActive",
ADD COLUMN     "isActive" "OrganizationStatus" NOT NULL DEFAULT 'ACTIVE';
