# County User Dashboard Features (Client Overview)

This document explains what a **County user** can do inside the BidBridge dashboard. It’s intended to help clients understand the **county role**, the **available screens**, and the **typical workflows**.

---

### Overview: what is a County user?

A **County user** is the administrative role responsible for managing auction properties and bidder access. County users can:

- Create and manage properties (including auction end dates and documents)
- Invite/link bidders to properties
- Record bids (when needed) and monitor bid activity
- Send alerts/updates to linked bidders
- Export reports
- Configure what bidders are allowed to see (visibility controls)
- Use messaging and view notifications

---

### How County differs from Bidder (at a glance)

- **County**: creates and administers auctions and bidder access.
- **Bidder**: participates in auctions they are linked to; can view information based on visibility settings.

Where the app enforces this:

- Some screens/actions are **county-only** (e.g. bidder management, report exports, property creation/deletion).
- County capabilities usually depend on the user’s account `type = "county"`.

---

### Dashboard home (`/dashboard`)

County users land on the dashboard overview where they can see:

- **Role-aware stats**: total properties created by the county, distinct active bidders linked to county properties, and count of sold properties.
- **Recent activity**: notifications + recent actions (property creation, status changes, bids, alerts).
- **Upcoming deadlines**: properties closing in the next 48 hours.
- **Quick actions** (county-only shortcuts):
  - Add Property (`/add-property`)
  - Add Bidder (`/add-bidder`)
  - Send Notice (to linked bidders for a selected property)
  - Export Data (download via `/api/reports/export`)

---

### Property management (`/properties`)

This is the main “manage auctions” screen for a county.

County users can:

- **List/search** properties
  - Search by address/parcel/city/zip
  - Filter “ending soon” (next 48 hours)
  - See **Added date** (created date/time), min bid, current bid, status
- **View** a property (`/property-details/[property-id]`)
- **Edit** a property (`/edit-property/[property-id]`)
- **Delete** a property (trash icon)
  - Deletes the property and related records (linked bidders, bids, property documents)

---

### Add a new property (`/add-property`)

County users can create a property with:

- Core fields (title, parcel ID, address, city, ZIP)
- Pricing/status fields (minimum bid, status)
- Additional details (square feet, year built, lot size)
- **Auction end date/time** (date + time selector)
- **Bidder visibility settings** (controls what linked bidders can see for this property)
- Optional document attachments (if enabled in the flow)

After creation, the county can navigate to the new property details page and continue setup (link bidders, upload documents, etc.).

---

### Edit property (`/edit-property/[property-id]`)

County users can update:

- Property info (address/parcel/title/details)
- Minimum bid and status (active/sold/withdrawn)
- Auction end date/time
- Visibility settings (per property)
- Linked bidders
- **Property documents** (upload/delete) for that property

This is the primary place where “administrative” edits happen.

---

### Property details (`/property-details/[property-id]`)

This is the “single property” view where county users can:

- Review property information, status, auction timeline, and bid activity
- **Link/unlink bidders** (manage who can access the property)
- Record bids (county-only “Add Bid” action, where supported)
- **Send Alert / Notice** to linked bidders
- View documents

Notes about documents:

- Property details is intended for **viewing** documents.
- Uploading/deleting documents is done from **Edit Property**.

---

### Bidder management (`/bidders`, `/add-bidder`, `/edit-bidder/[id]`)

County users can manage bidders:

- View/search the bidder list
- Add new bidders
- Edit bidder details
- View which properties a bidder is linked to (and how many)

This area is restricted to county users.

---

### Alerts & notifications

County users can keep bidders informed via:

- **Send Alert** from a property (emails linked bidders and logs in-app notifications)
- **Send Notice** from dashboard quick actions (choose property → select recipients → send)
- **In-app notifications** that appear in the UI and contribute to “Recent Activity” on the dashboard

---

### Visibility Control (`/visibility-control`)

County users can configure default visibility preferences that affect what bidders can see (depending on how the product is configured per property/user):

- Min bid
- Current bid
- Bid history
- Property status
- Bidder list
- Documents

These settings help control how much auction detail is exposed to bidders.

---

### Messaging (`/messaging`, `/messaging/[id]`)

County users can use messaging to communicate with users inside the platform:

- View existing conversations
- Search users by email/name and start a new conversation
- Open a conversation and exchange messages

---

### Reports & exports (`/reports`, `/api/reports/export`)

County users can export data for reporting purposes:

- Property report (CSV)
- Bidder report (Excel)
- Auction report (PDF)

Exports are restricted to county users.

---

### Typical county workflow (end-to-end)

1. **Create a property** (`/add-property`)
2. **Set auction end date/time** and visibility settings
3. **Link bidders** to the property (`/property-details/[id]` or via Edit)
4. **Upload property documents** (`/edit-property/[id]`)
5. **Monitor bids and activity** (`/dashboard` and property details)
6. **Send notices/alerts** to bidders as needed
7. **Update status** (e.g., sold/withdrawn) when the auction is complete
8. **Export reports** for stakeholders (`/reports`)

---

### Notes / limitations (client-facing)

- Some behaviors may differ depending on the environment (demo vs production) and configuration.
- Access control is role-driven: if a user is not a county user, county-only screens/actions are not available.
- Document upload/delete is intentionally separated from the view-only property details page to reduce risk of accidental changes.


