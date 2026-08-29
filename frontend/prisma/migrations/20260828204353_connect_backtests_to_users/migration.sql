-- Add userId as nullable first
ALTER TABLE "Backtest"
ADD COLUMN "userId" TEXT;

-- Assign existing backtests to the existing user
UPDATE "Backtest"
SET "userId" = 'cmte5hcjm00003ur0iku4twi0'
WHERE "userId" IS NULL;

-- Make userId required
ALTER TABLE "Backtest"
ALTER COLUMN "userId" SET NOT NULL;

-- Create indexes
CREATE INDEX "Backtest_userId_idx" ON "Backtest"("userId");

CREATE INDEX "Backtest_userId_createdAt_idx"
ON "Backtest"("userId", "createdAt");

-- Add foreign key
ALTER TABLE "Backtest"
ADD CONSTRAINT "Backtest_userId_fkey"
FOREIGN KEY ("userId")
REFERENCES "User"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;
