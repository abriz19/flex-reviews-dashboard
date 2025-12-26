-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "amenities" JSONB,
ADD COLUMN     "bathrooms" INTEGER,
ADD COLUMN     "bedrooms" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "images" JSONB,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "maxGuests" INTEGER,
ADD COLUMN     "pricePerNight" DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "properties_slug_idx" ON "properties"("slug");
