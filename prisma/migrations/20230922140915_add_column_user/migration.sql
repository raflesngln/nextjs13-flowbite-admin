-- AlterTable
ALTER TABLE `User` ADD COLUMN `photo` VARCHAR(191) NULL DEFAULT 'default.png',
    ADD COLUMN `verified` BOOLEAN NULL DEFAULT false;
