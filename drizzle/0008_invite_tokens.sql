CREATE TABLE `invite_tokens` (
	`id` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires` datetime NOT NULL,
	`created_at` datetime NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `token` (`token`)
);
