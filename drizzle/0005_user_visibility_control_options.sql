-- Visibility Control options update:
-- Use these keys instead of older columns:
--  - min_bid, current_bid, bid_history, property_status, bidder_list, documents
ALTER TABLE `user`
  ADD COLUMN `visibility_min_bid` int NOT NULL DEFAULT 1,
  ADD COLUMN `visibility_current_bid` int NOT NULL DEFAULT 1,
  ADD COLUMN `visibility_bid_history` int NOT NULL DEFAULT 0,
  ADD COLUMN `visibility_documents` int NOT NULL DEFAULT 0;


