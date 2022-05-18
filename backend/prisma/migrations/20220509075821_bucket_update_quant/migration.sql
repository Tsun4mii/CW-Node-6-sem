-- AlterTable
ALTER TABLE `bucket` ADD COLUMN `quantity` INTEGER NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `date` DATETIME(3) NULL;
