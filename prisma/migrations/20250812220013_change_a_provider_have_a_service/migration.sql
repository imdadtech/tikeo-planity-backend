/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Service_providerId_key" ON "Service"("providerId");
