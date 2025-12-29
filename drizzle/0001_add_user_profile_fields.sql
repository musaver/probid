-- Add essential profile fields to user table
-- Run this in phpMyAdmin

-- Only add the fields we actually use in the profile page
ALTER TABLE `user` 
ADD COLUMN IF NOT EXISTS `phone` varchar(20) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS `about_me` text DEFAULT NULL;

-- Note: address column should already exist based on your database
-- If it doesn't exist, uncomment the line below:
-- ADD COLUMN IF NOT EXISTS `address` varchar(100) DEFAULT NULL;
