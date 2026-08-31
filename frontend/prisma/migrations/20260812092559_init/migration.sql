-- CreateTable
CREATE TABLE "Backtest" (
    "id" TEXT NOT NULL,
    "strategy" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "initialCapital" DOUBLE PRECISION NOT NULL,
    "finalEquity" DOUBLE PRECISION NOT NULL,
    "netProfit" DOUBLE PRECISION NOT NULL,
    "totalReturnPercent" DOUBLE PRECISION NOT NULL,
    "totalTrades" INTEGER NOT NULL,
    "winningTrades" INTEGER NOT NULL,
    "losingTrades" INTEGER NOT NULL,
    "winRatePercent" DOUBLE PRECISION NOT NULL,
    "averageWin" DOUBLE PRECISION NOT NULL,
    "averageLoss" DOUBLE PRECISION NOT NULL,
    "largestWin" DOUBLE PRECISION NOT NULL,
    "largestLoss" DOUBLE PRECISION NOT NULL,
    "maximumDrawdown" DOUBLE PRECISION NOT NULL,
    "profitFactor" DOUBLE PRECISION NOT NULL,
    "expectancy" DOUBLE PRECISION NOT NULL,
    "annualizedReturn" DOUBLE PRECISION NOT NULL,
    "annualizedVolatility" DOUBLE PRECISION NOT NULL,
    "sharpeRatio" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Backtest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "side" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "executionPrice" DOUBLE PRECISION NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,
    "cashFlow" DOUBLE PRECISION NOT NULL,
    "backtestId" TEXT NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquityPoint" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "equity" DOUBLE PRECISION NOT NULL,
    "backtestId" TEXT NOT NULL,

    CONSTRAINT "EquityPoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_backtestId_fkey" FOREIGN KEY ("backtestId") REFERENCES "Backtest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquityPoint" ADD CONSTRAINT "EquityPoint_backtestId_fkey" FOREIGN KEY ("backtestId") REFERENCES "Backtest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
