CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` datetime,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `bidder_documents` (
	`id` varchar(255) NOT NULL,
	`bidder_id` varchar(255) NOT NULL,
	`name` varchar(255),
	`url` text,
	`pathname` text,
	`type` varchar(50),
	`size` varchar(50),
	`uploaded_at` datetime NOT NULL,
	CONSTRAINT `bidder_documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` varchar(255) NOT NULL,
	`participant1_id` varchar(255) NOT NULL,
	`participant2_id` varchar(255) NOT NULL,
	`property_id` varchar(255),
	`last_message_at` datetime,
	`created_at` datetime NOT NULL,
	`shared_key` text,
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invite_tokens` (
	`id` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires` datetime NOT NULL,
	`created_at` datetime NOT NULL,
	CONSTRAINT `invite_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `invite_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` varchar(255) NOT NULL,
	`conversation_id` varchar(255) NOT NULL,
	`sender_id` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`created_at` datetime NOT NULL,
	`is_read` int DEFAULT 0,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`type` enum('alert','bid','status') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text,
	`href` varchar(255),
	`metadata` json,
	`is_read` int DEFAULT 0,
	`created_at` datetime NOT NULL,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`address` text,
	`parcel_id` varchar(255),
	`sale_id` varchar(255) NOT NULL,
	`city` varchar(255),
	`zip_code` varchar(20),
	`square_feet` int,
	`year_built` int,
	`lot_size` varchar(50),
	`owners` json,
	`auction_end` datetime,
	`min_bid` decimal(12,2),
	`winning_bid` decimal(12,2),
	`winning_bidder_id` varchar(255),
	`visibility_settings` json,
	`status` enum('active','sold','withdrawn','on_list','sold_at_tax_sale','redeemed','voided','cancelled','deed_in_progress','deed_issued','redeemed_check_issued') DEFAULT 'active',
	`created_by` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `property_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property_alerts` (
	`id` varchar(255) NOT NULL,
	`property_id` varchar(255) NOT NULL,
	`sent_by_user_id` varchar(255) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`recipient_count` int NOT NULL,
	`created_at` datetime NOT NULL,
	CONSTRAINT `property_alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property_bids` (
	`id` varchar(255) NOT NULL,
	`property_id` varchar(255) NOT NULL,
	`bidder_id` varchar(255) NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`created_at` datetime NOT NULL,
	CONSTRAINT `property_bids_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property_documents` (
	`id` varchar(255) NOT NULL,
	`property_id` varchar(255) NOT NULL,
	`name` varchar(255),
	`url` text,
	`pathname` text,
	`type` varchar(50),
	`size` varchar(50),
	`uploaded_at` datetime NOT NULL,
	CONSTRAINT `property_documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property_linked_bidders` (
	`id` varchar(255) NOT NULL,
	`property_id` varchar(255) NOT NULL,
	`bidder_id` varchar(255) NOT NULL,
	`status` enum('invited','interested','bidding','won') DEFAULT 'invited',
	`linked_at` datetime NOT NULL,
	CONSTRAINT `property_linked_bidders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` datetime NOT NULL,
	CONSTRAINT `sessions_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` datetime,
	`image` text,
	`type` enum('bidder','county') DEFAULT 'bidder',
	`profile_picture` varchar(255),
	`username` varchar(100),
	`display_name` varchar(100),
	`skill` varchar(100),
	`occupation` varchar(100),
	`country` varchar(100),
	`city` varchar(100),
	`address` varchar(100),
	`state` varchar(100),
	`about_me` text,
	`phone` varchar(20),
	`county_id` varchar(255),
	`visibility_min_bid` int NOT NULL DEFAULT 1,
	`visibility_current_bid` int NOT NULL DEFAULT 1,
	`visibility_bid_history` int NOT NULL DEFAULT 0,
	`visibility_property_status` int NOT NULL DEFAULT 1,
	`visibility_bidder_list` int NOT NULL DEFAULT 0,
	`visibility_documents` int NOT NULL DEFAULT 0,
	`bidder_number` varchar(50),
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification_tokens` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`otp` varchar(255) NOT NULL,
	`expires` datetime NOT NULL,
	CONSTRAINT `verification_tokens_identifier_token_otp_pk` PRIMARY KEY(`identifier`,`token`,`otp`)
);
--> statement-breakpoint
CREATE INDEX `bidder_documents_bidder_id_idx` ON `bidder_documents` (`bidder_id`);--> statement-breakpoint
CREATE INDEX `bidder_documents_uploaded_at_idx` ON `bidder_documents` (`uploaded_at`);--> statement-breakpoint
CREATE INDEX `notifications_user_id_idx` ON `notifications` (`user_id`);--> statement-breakpoint
CREATE INDEX `notifications_user_unread_idx` ON `notifications` (`user_id`,`is_read`);--> statement-breakpoint
CREATE INDEX `notifications_created_at_idx` ON `notifications` (`created_at`);--> statement-breakpoint
CREATE INDEX `property_alerts_property_id_idx` ON `property_alerts` (`property_id`);--> statement-breakpoint
CREATE INDEX `property_alerts_sent_by_idx` ON `property_alerts` (`sent_by_user_id`);--> statement-breakpoint
CREATE INDEX `property_bids_property_id_idx` ON `property_bids` (`property_id`);--> statement-breakpoint
CREATE INDEX `property_bids_property_amount_idx` ON `property_bids` (`property_id`,`amount`);