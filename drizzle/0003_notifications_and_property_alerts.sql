-- Create property_alerts table
CREATE TABLE IF NOT EXISTS `property_alerts` (
  `id` varchar(255) NOT NULL,
  `property_id` varchar(255) NOT NULL,
  `sent_by_user_id` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `recipient_count` int NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `property_alerts_property_id_idx` (`property_id`),
  KEY `property_alerts_sent_by_idx` (`sent_by_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create notifications table
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `type` enum('alert','bid','status') NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text,
  `href` varchar(255),
  `metadata` json,
  `is_read` int DEFAULT 0,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id_idx` (`user_id`),
  KEY `notifications_user_unread_idx` (`user_id`, `is_read`),
  KEY `notifications_created_at_idx` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


