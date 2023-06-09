-- DropIndex
DROP INDEX `Menu_Price_menu_code_fkey` ON `menu_price`;

-- DropIndex
DROP INDEX `Menus_category_Id_fkey` ON `menus`;

-- AddForeignKey
ALTER TABLE `Menus` ADD CONSTRAINT `Menus_category_Id_fkey` FOREIGN KEY (`category_Id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu_Price` ADD CONSTRAINT `Menu_Price_menu_code_fkey` FOREIGN KEY (`menu_code`) REFERENCES `Menus`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
