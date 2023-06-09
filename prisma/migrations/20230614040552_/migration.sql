/*
  Warnings:

  - You are about to drop the column `menu_id` on the `Menu_Price` table. All the data in the column will be lost.
  - Added the required column `menu_code` to the `Menu_Price` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Menu_Price` DROP FOREIGN KEY `Menu_Price_menu_id_fkey`;

-- AlterTable
ALTER TABLE `Menu_Price` DROP COLUMN `menu_id`,
    ADD COLUMN `menu_code` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Menu_Price` ADD CONSTRAINT `Menu_Price_menu_code_fkey` FOREIGN KEY (`menu_code`) REFERENCES `Menus`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
