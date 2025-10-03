/*
  Warnings:

  - You are about to drop the column `basePrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Attribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AttributeValue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductAttribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductUnitPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Variation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_VariationAttributeValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."StepType" AS ENUM ('SELECT', 'NUMBER', 'TEXT', 'CHECKBOX');

-- CreateEnum
CREATE TYPE "public"."PricingImpact" AS ENUM ('BASE', 'MULTIPLIER', 'ADDITIVE', 'NONE');

-- DropForeignKey
ALTER TABLE "public"."AttributeValue" DROP CONSTRAINT "AttributeValue_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductAttribute" DROP CONSTRAINT "ProductAttribute_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductAttribute" DROP CONSTRAINT "ProductAttribute_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductUnitPrice" DROP CONSTRAINT "ProductUnitPrice_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductUnitPrice" DROP CONSTRAINT "ProductUnitPrice_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Variation" DROP CONSTRAINT "Variation_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_VariationAttributeValue" DROP CONSTRAINT "_VariationAttributeValue_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_VariationAttributeValue" DROP CONSTRAINT "_VariationAttributeValue_B_fkey";

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "basePrice";

-- DropTable
DROP TABLE "public"."Attribute";

-- DropTable
DROP TABLE "public"."AttributeValue";

-- DropTable
DROP TABLE "public"."ProductAttribute";

-- DropTable
DROP TABLE "public"."ProductUnitPrice";

-- DropTable
DROP TABLE "public"."Variation";

-- DropTable
DROP TABLE "public"."_VariationAttributeValue";

-- DropEnum
DROP TYPE "public"."AttributeType";

-- CreateTable
CREATE TABLE "public"."FormStep" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" "public"."StepType" NOT NULL,
    "question" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "pricingImpact" "public"."PricingImpact" NOT NULL DEFAULT 'NONE',
    "pricePerUnit" DOUBLE PRECISION,
    "unit" TEXT,
    "minValue" DOUBLE PRECISION,
    "maxValue" DOUBLE PRECISION,
    "defaultValue" DOUBLE PRECISION,
    "conditionalOn" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StepOption" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StepOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormStep_productId_order_key" ON "public"."FormStep"("productId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "StepOption_stepId_order_key" ON "public"."StepOption"("stepId", "order");

-- AddForeignKey
ALTER TABLE "public"."FormStep" ADD CONSTRAINT "FormStep_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StepOption" ADD CONSTRAINT "StepOption_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "public"."FormStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;
