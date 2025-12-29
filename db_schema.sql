-- Create conversations table
CREATE TABLE IF NOT EXISTS `conversations` (
  `id` varchar(255) NOT NULL,
  `participant1_id` varchar(255) NOT NULL,
  `participant2_id` varchar(255) NOT NULL,
  `last_message_at` datetime,
  `created_at` datetime NOT NULL,
  `shared_key` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create messages table
CREATE TABLE IF NOT EXISTS `messages` (
  `id` varchar(255) NOT NULL,
  `conversation_id` varchar(255) NOT NULL,
  `sender_id` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL,
  `is_read` int DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create property table
CREATE TABLE IF NOT EXISTS `property` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `address` text,
  `parcel_id` varchar(255),
  `city` varchar(255),
  `zip_code` varchar(20),
  `square_feet` int,
  `year_built` int,
  `lot_size` varchar(50),
  `auction_end` datetime,
  `min_bid` int,
  `visibility_settings` json,
  `status` enum('active', 'sold', 'withdrawn') DEFAULT 'active',
  `created_by` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create property_linked_bidders table
CREATE TABLE IF NOT EXISTS `property_linked_bidders` (
  `id` varchar(255) NOT NULL,
  `property_id` varchar(255) NOT NULL,
  `bidder_id` varchar(255) NOT NULL,
  `status` enum('invited', 'interested', 'bidding', 'won') DEFAULT 'invited',
  `linked_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create property_documents table
CREATE TABLE IF NOT EXISTS `property_documents` (
  `id` varchar(255) NOT NULL,
  `property_id` varchar(255) NOT NULL,
  `name` varchar(255),
  `url` text,
  `pathname` text,
  `type` varchar(50),
  `size` varchar(50),
  `uploaded_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create bidder_documents table (Identity Documents)
CREATE TABLE IF NOT EXISTS `bidder_documents` (
  `id` varchar(255) NOT NULL,
  `bidder_id` varchar(255) NOT NULL,
  `name` varchar(255),
  `url` text,
  `pathname` text,
  `type` varchar(50),
  `size` varchar(50),
  `uploaded_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bidder_documents_bidder_id_idx` (`bidder_id`),
  KEY `bidder_documents_uploaded_at_idx` (`uploaded_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create property_bids table
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

-- Update user table to add type column if it doesn't exist
-- You may need to run this separately or ignore if column exists
ALTER TABLE `user` ADD COLUMN `type` enum('bidder', 'county') DEFAULT 'bidder';

-- Visibility Control defaults (user-level)
ALTER TABLE `user`
  ADD COLUMN `visibility_minimum_bid` int NOT NULL DEFAULT 1,
  ADD COLUMN `visibility_winning_bid` int NOT NULL DEFAULT 1,
  ADD COLUMN `visibility_property_status` int NOT NULL DEFAULT 1,
  ADD COLUMN `visibility_bidder_list` int NOT NULL DEFAULT 0;

-- Visibility Control options (new keys used by Visibility Control page)
ALTER TABLE `user`
  ADD COLUMN `visibility_min_bid` int NOT NULL DEFAULT 1,
  ADD COLUMN `visibility_current_bid` int NOT NULL DEFAULT 1,
  ADD COLUMN `visibility_bid_history` int NOT NULL DEFAULT 0,
  ADD COLUMN `visibility_documents` int NOT NULL DEFAULT 0;
