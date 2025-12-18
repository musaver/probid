CREATE TABLE `bidder_documents` (
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
);


