/*
  Warnings:

  - You are about to drop the column `isActive` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "isActive",
ADD COLUMN     "status" "OrganizationStatus" NOT NULL DEFAULT 'ACTIVE';
