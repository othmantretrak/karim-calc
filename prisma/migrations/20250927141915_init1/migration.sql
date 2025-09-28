/*
  Warnings:

  - You are about to drop the `_AttributeToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AttributeValueToVariation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `AttributeValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basePrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Variation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."AttributeValue" DROP CONSTRAINT "AttributeValue_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Variation" DROP CONSTRAINT "Variation_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AttributeToProduct" DROP CONSTRAINT "_AttributeToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AttributeToProduct" DROP CONSTRAINT "_AttributeToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AttributeValueToVariation" DROP CONSTRAINT "_AttributeValueToVariation_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AttributeValueToVariation" DROP CONSTRAINT "_AttributeValueToVariation_B_fkey";

-- DropIndex
DROP INDEX "public"."AttributeValue_attributeId_value_key";

-- AlterTable
ALTER TABLE "public"."Attribute" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."AttributeValue" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "basePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Variation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."_AttributeToProduct";

-- DropTable
DROP TABLE "public"."_AttributeValueToVariation";

-- CreateTable
CREATE TABLE "public"."ProductAttribute" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,

    CONSTRAINT "ProductAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_VariationAttributeValue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_VariationAttributeValue_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttribute_productId_attributeId_key" ON "public"."ProductAttribute"("productId", "attributeId");

-- CreateIndex
CREATE INDEX "_VariationAttributeValue_B_index" ON "public"."_VariationAttributeValue"("B");

-- AddForeignKey
ALTER TABLE "public"."AttributeValue" ADD CONSTRAINT "AttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "public"."Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductAttribute" ADD CONSTRAINT "ProductAttribute_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductAttribute" ADD CONSTRAINT "ProductAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "public"."Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Variation" ADD CONSTRAINT "Variation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_VariationAttributeValue" ADD CONSTRAINT "_VariationAttributeValue_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."AttributeValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_VariationAttributeValue" ADD CONSTRAINT "_VariationAttributeValue_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Variation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
