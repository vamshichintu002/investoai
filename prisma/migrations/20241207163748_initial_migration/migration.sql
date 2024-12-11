-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_details" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "employmentStatus" TEXT NOT NULL,
    "annualIncome" DOUBLE PRECISION NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "selectedGoals" TEXT[],
    "investmentHorizon" TEXT NOT NULL,
    "riskTolerance" TEXT NOT NULL,
    "riskComfortLevel" INTEGER NOT NULL,
    "monthlyIncome" DOUBLE PRECISION NOT NULL,
    "monthlyExpenses" DOUBLE PRECISION NOT NULL,
    "selectedInvestments" TEXT[],
    "managementStyle" TEXT NOT NULL,
    "lifeChangesDetails" TEXT,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "form_details_userId_key" ON "form_details"("userId");

-- CreateIndex
CREATE INDEX "form_details_userId_idx" ON "form_details"("userId");

-- AddForeignKey
ALTER TABLE "form_details" ADD CONSTRAINT "form_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
