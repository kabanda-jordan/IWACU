-- AlterEnum
ALTER TYPE "PropertyType" ADD VALUE 'VILLA';
ALTER TYPE "PropertyType" ADD VALUE 'OFFICE';

-- AlterTable: add missing columns to properties
ALTER TABLE "properties" ADD COLUMN "priceType" TEXT NOT NULL DEFAULT 'sale';
ALTER TABLE "properties" ADD COLUMN "bedrooms" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "properties" ADD COLUMN "bathrooms" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "properties" ADD COLUMN "parking" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "properties" ADD COLUMN "floors" INTEGER;
ALTER TABLE "properties" ADD COLUMN "yearBuilt" INTEGER;
ALTER TABLE "properties" ADD COLUMN "amenities" TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE "properties" ADD COLUMN "features" TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE "properties" ADD COLUMN "city" TEXT NOT NULL DEFAULT 'Kigali';
ALTER TABLE "properties" ADD COLUMN "isFeatured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable: add userId to verification_requests
ALTER TABLE "verification_requests" ADD COLUMN "userId" TEXT NOT NULL DEFAULT 'temp';
ALTER TABLE "verification_requests" ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE "verification_requests" ADD CONSTRAINT "verification_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
