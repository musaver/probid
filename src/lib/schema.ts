import {
  mysqlTable,
  varchar,
  datetime,
  text,
  primaryKey,
  mysqlEnum,
  int,
  json,
} from 'drizzle-orm/mysql-core';

// ✅ User table (required)
export const user = mysqlTable('user', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: datetime('emailVerified'),
  image: text('image'),
  type: mysqlEnum('type', ['bidder', 'county']).default('bidder'),
  profilePicture: varchar('profile_picture', { length: 255 }),
  username: varchar('username', { length: 100 }),
  displayName: varchar('display_name', { length: 100 }),
  skill: varchar('skill', { length: 100 }),
  occupation: varchar('occupation', { length: 100 }),
  country: varchar('country', { length: 100 }),
  city: varchar('city', { length: 100 }),
  address: varchar('address', { length: 100 }),
  state: varchar('state', { length: 100 }),
  aboutMe: text('about_me'),
  phone: varchar('phone', { length: 20 }),
});

// ✅ Accounts table (OAuth support: Google, Facebook)
export const account = mysqlTable(
  'account',
  {
    userId: varchar('userId', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }).notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: datetime('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.provider, table.providerAccountId] }),
  })
);

// ✅ Sessions table (for session-based auth, even if using JWT)
export const sessions = mysqlTable('sessions', {
  sessionToken: varchar('sessionToken', { length: 255 }).primaryKey(),
  userId: varchar('userId', { length: 255 }).notNull(),
  expires: datetime('expires').notNull(),
});

// ✅ Verification tokens (for email OTP, magic links)
export const verification_tokens = mysqlTable(
  'verification_tokens',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    otp: varchar('otp', { length: 255 }).notNull(),
    expires: datetime('expires').notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.identifier, table.token, table.otp] }),
  })
);

// ✅ Property table
export const property = mysqlTable('property', {
  id: varchar('id', { length: 255 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  address: text('address'),
  parcelId: varchar('parcel_id', { length: 255 }),
  city: varchar('city', { length: 255 }),
  zipCode: varchar('zip_code', { length: 20 }),
  squareFeet: int('square_feet'),
  yearBuilt: int('year_built'),
  lotSize: varchar('lot_size', { length: 50 }),
  auctionEnd: datetime('auction_end'),
  visibilitySettings: json('visibility_settings'),
  status: mysqlEnum('status', ['active', 'sold', 'withdrawn']).default('active'),
  createdBy: varchar('created_by', { length: 255 }).notNull(), // FK to user.id
  createdAt: datetime('created_at').notNull(),
  updatedAt: datetime('updated_at').notNull(),
});

// ✅ Property Linked Bidders table
export const propertyLinkedBidders = mysqlTable('property_linked_bidders', {
  id: varchar('id', { length: 255 }).primaryKey(),
  propertyId: varchar('property_id', { length: 255 }).notNull(), // FK to property.id
  bidderId: varchar('bidder_id', { length: 255 }).notNull(), // FK to user.id
  status: mysqlEnum('status', ['invited', 'interested', 'bidding', 'won']).default('invited'),
  linkedAt: datetime('linked_at').notNull(),
});

// ✅ Property Documents table
export const propertyDocuments = mysqlTable('property_documents', {
  id: varchar('id', { length: 255 }).primaryKey(),
  propertyId: varchar('property_id', { length: 255 }).notNull(), // FK to property.id
  name: varchar('name', { length: 255 }),
  url: text('url'),
  type: varchar('type', { length: 50 }),
  size: varchar('size', { length: 50 }),
  uploadedAt: datetime('uploaded_at').notNull(),
});

// ✅ Conversations table
export const conversations = mysqlTable('conversations', {
  id: varchar('id', { length: 255 }).primaryKey(),
  participant1Id: varchar('participant1_id', { length: 255 }).notNull(), // FK to user.id
  participant2Id: varchar('participant2_id', { length: 255 }).notNull(), // FK to user.id
  lastMessageAt: datetime('last_message_at'),
  createdAt: datetime('created_at').notNull(),
  sharedKey: text('shared_key'), // Shared key for E2EE (simplified)
});

// ✅ Messages table
export const messages = mysqlTable('messages', {
  id: varchar('id', { length: 255 }).primaryKey(),
  conversationId: varchar('conversation_id', { length: 255 }).notNull(), // FK to conversations.id
  senderId: varchar('sender_id', { length: 255 }).notNull(), // FK to user.id
  content: text('content').notNull(), // Encrypted content
  createdAt: datetime('created_at').notNull(),
  isRead: int('is_read').default(0), // 0 or 1
});
