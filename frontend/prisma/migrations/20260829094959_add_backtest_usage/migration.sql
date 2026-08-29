-- CreateTable
CREATE TABLE "BacktestUsage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BacktestUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BacktestUsage_userId_date_idx" ON "BacktestUsage"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "BacktestUsage_userId_date_key" ON "BacktestUsage"("userId", "date");

-- AddForeignKey
ALTER TABLE "BacktestUsage" ADD CONSTRAINT "BacktestUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
