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
  `type` varchar(50),
  `size` varchar(50),
  `uploaded_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Update user table to add type column if it doesn't exist
-- You may need to run this separately or ignore if column exists
ALTER TABLE `user` ADD COLUMN `type` enum('bidder', 'county') DEFAULT 'bidder';
