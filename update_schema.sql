ALTER TABLE `property` ADD COLUMN `sale_id` varchar(255);
ALTER TABLE `property` ADD COLUMN `owners` json;
ALTER TABLE `property` ADD COLUMN `winning_bid` int;
ALTER TABLE `property` ADD COLUMN `winning_bidder_id` varchar(255);
ALTER TABLE `property` MODIFY COLUMN `status` ENUM('active', 'sold', 'withdrawn', 'on_list', 'sold_at_tax_sale', 'redeemed', 'voided', 'cancelled', 'deed_in_progress', 'deed_issued', 'redeemed_check_issued') DEFAULT 'active';
ALTER TABLE `property` MODIFY COLUMN `sale_id` varchar(255) NOT NULL;