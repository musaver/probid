-- Add min_bid to property
ALTER TABLE `property`
  ADD COLUMN `min_bid` int DEFAULT NULL;

-- Add pathname to property_documents (needed to delete from Vercel Blob)
ALTER TABLE `property_documents`
  ADD COLUMN `pathname` text DEFAULT NULL;

-- Create property_bids table (real bids + bid history)
CREATE TABLE IF NOT EXISTS `property_bids` (
  `id` varchar(255) NOT NULL,
  `property_id` varchar(255) NOT NULL,
  `bidder_id` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `property_bids_property_id_idx` (`property_id`),
  KEY `property_bids_property_amount_idx` (`property_id`, `amount`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


