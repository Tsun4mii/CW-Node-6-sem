/*
  Warnings:

  - You are about to drop the column `orderId` on the `bucket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `bucket` DROP FOREIGN KEY `Bucket_orderId_fkey`;

-- AlterTable
ALTER TABLE `bucket` DROP COLUMN `orderId`;

-- AlterTable
ALTER TABLE `order` MODIFY `id` INTEGER NOT NULL;
