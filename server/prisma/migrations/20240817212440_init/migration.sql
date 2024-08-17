-- CreateTable
CREATE TABLE "contributions" (
    "contri_id" SERIAL NOT NULL,
    "spending_id" INTEGER,
    "user_id" INTEGER,
    "amount" DECIMAL(10,2),

    CONSTRAINT "contributions_pkey" PRIMARY KEY ("contri_id")
);

-- CreateTable
CREATE TABLE "friends" (
    "user_id" INTEGER NOT NULL,
    "friend_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "balance" DECIMAL(10,2) DEFAULT 0,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("user_id","friend_id")
);

-- CreateTable
CREATE TABLE "personal_expenses" (
    "expense_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "amount" DECIMAL(10,2),
    "description" TEXT,
    "date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "personal_expenses_pkey" PRIMARY KEY ("expense_id")
);

-- CreateTable
CREATE TABLE "spendings" (
    "spending_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "amount" DECIMAL(10,2),
    "description" TEXT,
    "date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spendings_pkey" PRIMARY KEY ("spending_id")
);

-- CreateTable
CREATE TABLE "unregistered_contributions" (
    "contri_id" SERIAL NOT NULL,
    "spending_id" INTEGER,
    "user_id" INTEGER,
    "amount" DECIMAL(10,2),

    CONSTRAINT "unregistered_contributions_pkey" PRIMARY KEY ("contri_id")
);

-- CreateTable
CREATE TABLE "unregistered_friends" (
    "user_id" INTEGER NOT NULL,
    "friend_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "balance" DECIMAL(10,2),

    CONSTRAINT "unregistered_friends_pkey" PRIMARY KEY ("user_id","friend_id")
);

-- CreateTable
CREATE TABLE "unregistered_users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,

    CONSTRAINT "unregistered_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(10) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "idx_contributions_spending_id" ON "contributions"("spending_id");

-- CreateIndex
CREATE INDEX "idx_contributions_user_id" ON "contributions"("user_id");

-- CreateIndex
CREATE INDEX "idx_expense_description" ON "personal_expenses"("description");

-- CreateIndex
CREATE INDEX "idx_personal_expenses_user_id" ON "personal_expenses"("user_id");

-- CreateIndex
CREATE INDEX "idx_spending_description" ON "spendings"("description");

-- CreateIndex
CREATE INDEX "idx_spendings_user_id" ON "spendings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "contributions" ADD CONSTRAINT "contributions_spending_id_fkey" FOREIGN KEY ("spending_id") REFERENCES "spendings"("spending_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contributions" ADD CONSTRAINT "contributions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personal_expenses" ADD CONSTRAINT "personal_expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "spendings" ADD CONSTRAINT "spendings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unregistered_contributions" ADD CONSTRAINT "unregistered_contributions_spending_id_fkey" FOREIGN KEY ("spending_id") REFERENCES "spendings"("spending_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unregistered_contributions" ADD CONSTRAINT "unregistered_contributions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "unregistered_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unregistered_friends" ADD CONSTRAINT "unregistered_friends_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "unregistered_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unregistered_friends" ADD CONSTRAINT "unregistered_friends_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
