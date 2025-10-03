-- CreateEnum
CREATE TYPE "public"."AttributeType" AS ENUM ('SELECT', 'NUMBER');

-- AlterTable
ALTER TABLE "public"."Attribute" ADD COLUMN     "type" "public"."AttributeType" NOT NULL DEFAULT 'SELECT',
ADD COLUMN     "unit" TEXT;

-- CreateTable
CREATE TABLE "public"."ProductUnitPrice" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "defaultQuantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductUnitPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductUnitPrice_productId_attributeId_key" ON "public"."ProductUnitPrice"("productId", "attributeId");

-- AddForeignKey
ALTER TABLE "public"."ProductUnitPrice" ADD CONSTRAINT "ProductUnitPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductUnitPrice" ADD CONSTRAINT "ProductUnitPrice_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "public"."Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
