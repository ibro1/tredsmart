-- AlterTable
ALTER TABLE "User" ADD COLUMN     "autoTrading" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxSlippage" DOUBLE PRECISION,
ADD COLUMN     "stopLoss" DOUBLE PRECISION,
ADD COLUMN     "takeProfit" DOUBLE PRECISION,
ADD COLUMN     "tradeAmount" DOUBLE PRECISION,
ADD COLUMN     "walletAddress" TEXT,
ADD COLUMN     "walletConnectedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "influencers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "profileImage" TEXT,
    "followersCount" INTEGER NOT NULL,
    "tweetsCount" INTEGER NOT NULL,

    CONSTRAINT "influencers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweets" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tweetId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL,
    "influencerId" TEXT NOT NULL,

    CONSTRAINT "tweets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_signals" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "tweetId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "executedAt" TIMESTAMP(3),

    CONSTRAINT "token_signals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trades" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tokenSignalId" TEXT NOT NULL,
    "inputAmount" DOUBLE PRECISION NOT NULL,
    "outputAmount" DOUBLE PRECISION,
    "tokenAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "txId" TEXT,
    "error" TEXT,
    "stopLoss" DOUBLE PRECISION,
    "takeProfit" DOUBLE PRECISION,
    "platformFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "networkFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "executedAt" TIMESTAMP(3),
    "soldAt" TIMESTAMP(3),
    "soldAmount" DOUBLE PRECISION,
    "soldTxId" TEXT,
    "profitLoss" DOUBLE PRECISION,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserInfluencers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "influencers_username_key" ON "influencers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tweets_tweetId_key" ON "tweets"("tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "token_signals_tweetId_key" ON "token_signals"("tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserInfluencers_AB_unique" ON "_UserInfluencers"("A", "B");

-- CreateIndex
CREATE INDEX "_UserInfluencers_B_index" ON "_UserInfluencers"("B");
