/*
  Warnings:

  - You are about to drop the column `endDate` on the `Backtest` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Backtest` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Backtest` table. All the data in the column will be lost.
  - You are about to drop the column `timeframe` on the `Backtest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Backtest" DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "symbol",
DROP COLUMN "timeframe";
