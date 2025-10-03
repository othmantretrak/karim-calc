/*
  Warnings:

  - You are about to drop the column `defaultValue` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `maxValue` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `minValue` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerUnit` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `pricingImpact` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `required` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `FormStep` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stepId,questionNum,order]` on the table `StepOption` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `question1` to the `FormStep` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type1` to the `FormStep` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."StepOption_stepId_order_key";

-- AlterTable
ALTER TABLE "public"."FormStep" DROP COLUMN "defaultValue",
DROP COLUMN "maxValue",
DROP COLUMN "minValue",
DROP COLUMN "pricePerUnit",
DROP COLUMN "pricingImpact",
DROP COLUMN "question",
DROP COLUMN "required",
DROP COLUMN "type",
DROP COLUMN "unit",
ADD COLUMN     "defaultValue1" DOUBLE PRECISION,
ADD COLUMN     "defaultValue2" DOUBLE PRECISION,
ADD COLUMN     "maxValue1" DOUBLE PRECISION,
ADD COLUMN     "maxValue2" DOUBLE PRECISION,
ADD COLUMN     "minValue1" DOUBLE PRECISION,
ADD COLUMN     "minValue2" DOUBLE PRECISION,
ADD COLUMN     "pricePerUnit1" DOUBLE PRECISION,
ADD COLUMN     "pricePerUnit2" DOUBLE PRECISION,
ADD COLUMN     "pricingImpact1" "public"."PricingImpact" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "pricingImpact2" "public"."PricingImpact" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "question1" TEXT NOT NULL,
ADD COLUMN     "question2" TEXT,
ADD COLUMN     "required1" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "required2" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type1" "public"."StepType" NOT NULL,
ADD COLUMN     "type2" "public"."StepType",
ADD COLUMN     "unit1" TEXT,
ADD COLUMN     "unit2" TEXT;

-- AlterTable
ALTER TABLE "public"."StepOption" ADD COLUMN     "questionNum" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "StepOption_stepId_questionNum_order_key" ON "public"."StepOption"("stepId", "questionNum", "order");
