-- DropForeignKey
ALTER TABLE `bucket` DROP FOREIGN KEY `Bucket_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `bucket` DROP FOREIGN KEY `Bucket_partId_fkey`;

-- AlterTable
ALTER TABLE `bucket` MODIFY `orderId` INTEGER NULL,
    MODIFY `partId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Bucket` ADD CONSTRAINT `Bucket_partId_fkey` FOREIGN KEY (`partId`) REFERENCES `Part`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bucket` ADD CONSTRAINT `Bucket_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
