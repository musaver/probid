-- Add visibility-control settings to user profile (defaults)
ALTER TABLE `user`
  ADD COLUMN `visibility_minimum_bid` int NOT NULL DEFAULT 1,
  ADD COLUMN `visibility_winning_bid` int NOT NULL DEFAULT 1,
  ADD COLUMN `visibility_property_status` int NOT NULL DEFAULT 1,
  ADD COLUMN `visibility_bidder_list` int NOT NULL DEFAULT 0;


