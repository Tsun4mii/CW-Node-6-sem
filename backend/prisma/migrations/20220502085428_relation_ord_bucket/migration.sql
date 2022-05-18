/*
  Warnings:

  - Added the required column `orderId` to the `Bucket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bucket` ADD COLUMN `orderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AddForeignKey
ALTER TABLE `Bucket` ADD CONSTRAINT `Bucket_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
