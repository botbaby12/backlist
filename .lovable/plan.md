

## Backlist - Car Sourcing App

### Overview
A responsive car listings app that displays vehicle listings from multiple marketplaces (Craigslist, Cars.com, AutoTrader, Facebook Marketplace) with user authentication and saved listings functionality.

---

### Page 1: Listings Feed (Main Page)
**Desktop View:**
- Left sidebar with Backlist logo, navigation items (Listings, Saved, Help Center), and logout button
- Main content area with "Listings" header, search bar, and a 3-column grid of listing cards
- Each card displays: car photo, source icon (CL/FB/Cars.com/AutoTrader), deal badge (Pass/Steal), title, distance, date posted, mileage, price, and estimated value

**Mobile View:**
- Header with Backlist logo and action icons (list view toggle, currency, search)
- Filter tabs: All, AI Picks, Saved
- 2-column card grid with the same card information
- Bottom navigation bar: Home, Feed, Inventory, Wins, Settings

**Card Features:**
- Heart/favorite icon to save listings
- Source platform indicator with recognizable icons
- Color-coded deal badges (green for Steal, neutral for Pass)
- Price displayed prominently with estimated value comparison

---

### Page 2: Saved Listings
- Same layout structure as the main feed
- Shows only listings the user has favorited
- Heart icon toggled to "filled" state for saved items
- Empty state message when no listings are saved

---

### Image Extraction System
- Edge function using Firecrawl to scrape listing photos from marketplace URLs
- Supports: Craigslist, Cars.com, AutoTrader, Facebook Marketplace
- Extracts primary listing image(s) for display in cards

---

### User Authentication
- Login/signup page with email and password
- Protected routes - users must be logged in to access the app
- User session management with Supabase Auth

---

### Database Structure
- **listings** table: Stores car listing data (title, price, estimated value, mileage, location, source, image URLs, deal grade, original URL)
- **saved_listings** table: Links users to their favorited listings
- **user_roles** table: For future role-based features

---

### Design Style
Following the Swoopa reference mockups:
- Clean, modern card-based UI
- White/light background with subtle shadows
- Responsive grid layout (2 columns mobile, 3 columns desktop)
- Prominent pricing with sparkle icon for estimates
- Source platform badges overlaid on images
- Smooth transitions and hover states

