/*
  Warnings:

  - You are about to drop the column `conditionalOn` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `defaultValue1` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `defaultValue2` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `maxValue1` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `maxValue2` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `minValue1` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `minValue2` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerUnit1` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerUnit2` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `pricingImpact1` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `pricingImpact2` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `question1` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `question2` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `required1` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `required2` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `type1` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `type2` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `unit1` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `unit2` on the `FormStep` table. All the data in the column will be lost.
  - You are about to drop the column `questionNum` on the `StepOption` table. All the data in the column will be lost.
  - You are about to drop the column `stepId` on the `StepOption` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[questionId,order]` on the table `StepOption` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questionId` to the `StepOption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."StepOption" DROP CONSTRAINT "StepOption_stepId_fkey";

-- DropIndex
DROP INDEX "public"."StepOption_stepId_questionNum_order_key";

-- AlterTable
ALTER TABLE "public"."FormStep" DROP COLUMN "conditionalOn",
DROP COLUMN "defaultValue1",
DROP COLUMN "defaultValue2",
DROP COLUMN "maxValue1",
DROP COLUMN "maxValue2",
DROP COLUMN "minValue1",
DROP COLUMN "minValue2",
DROP COLUMN "pricePerUnit1",
DROP COLUMN "pricePerUnit2",
DROP COLUMN "pricingImpact1",
DROP COLUMN "pricingImpact2",
DROP COLUMN "question1",
DROP COLUMN "question2",
DROP COLUMN "required1",
DROP COLUMN "required2",
DROP COLUMN "type1",
DROP COLUMN "type2",
DROP COLUMN "unit1",
DROP COLUMN "unit2";

-- AlterTable
ALTER TABLE "public"."StepOption" DROP COLUMN "questionNum",
DROP COLUMN "stepId",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "questionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Question" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
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

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_stepId_order_key" ON "public"."Question"("stepId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "StepOption_questionId_order_key" ON "public"."StepOption"("questionId", "order");

-- AddForeignKey
ALTER TABLE "public"."Question" ADD CONSTRAINT "Question_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "public"."FormStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StepOption" ADD CONSTRAINT "StepOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
