# Deal Rating System

This document explains the deal rating system integrated into the iOS deployment.

## Overview

The deal rating system calculates and assigns grades to car listings based on profit margin by comparing the predicted price (from ML model) with the actual sale price.

## Deal Rating Formula

```javascript
margin = ((predictedPrice - salePrice) / salePrice) * 100
```

## Rating Grades

| Grade | Margin | Badge | Description |
|-------|---------|-------|-------------|
| 🔥 **Steal** | ≥ 20% | Green | Predicted price is 20%+ higher than asking price |
| ✨ **Great** | 10-19% | Blue | Predicted price is 10-19% higher |
| 👍 **Good** | 2-9% | Light Green | Predicted price is 2-9% higher |
| 📊 **Fair** | -10% to 1% | Yellow | Within 10% of predicted price |
| ❌ **Pass** | < -10% | Gray | Asking price is much higher than predicted |

## Implementation

### Frontend Components

#### 1. ListingCard.tsx
The main component that displays car listings with:
- Deal badge showing the grade (via `DealBadge` component)
- Source icon (Craigslist, AutoTrader, Cars.com, Facebook)
- Price and estimated value
- Location and mileage
- Stock photos fallback when no image is available
- Click to open original listing URL

#### 2. DealBadge.tsx
Displays the deal rating badge with:
- Color-coded backgrounds
- Emoji indicators
- All 5 rating levels

#### 3. SourceIcon.tsx
Shows the listing source platform with branded colors.

### Type Definitions

Updated `src/types/listing.ts` to include:
```typescript
export type DealGrade = 'steal' | 'great' | 'good' | 'fair' | 'pass';

export interface Listing {
  // ... existing fields
  dealGrade: DealGrade;
  margin?: number;
  year?: number;
  transmission?: string;
  vin?: string;
  exterior?: string;
  interior?: string;
  make?: string;
  model?: string;
}
```

## Backend Integration

The deal rating logic resides in the backend API (`listings.js` on the server):

```javascript
dealGrade: predictedPrice > 0 
  ? (margin >= 20 ? 'steal' : margin >= 10 ? 'great' : margin >= 2 ? 'good' : margin >= -10 ? 'fair' : 'pass') 
  : null,
```

### API Endpoint

**Base URL**: `http://159.223.113.123:3000/api/listings`

**Query Parameters**:
- `minMargin` - Only show deals above a certain margin
- `maxPrice` - Filter by maximum price
- `minPrice` - Filter by minimum price
- `source` - Filter by data source (cars.com, autotrader, craigslist)
- `search` - Search by title, make, or model
- `limit` - Number of results per page (default: 100)
- `page` - Page number

**Example Requests**:
```bash
# Get all great deals (10%+ margin)
GET /api/listings?minMargin=10&limit=50

# Get stats
GET /api/listings/stats
```

## Features

### 1. Visual Indicators
- Color-coded badges for quick assessment
- Emoji indicators for at-a-glance understanding
- Estimated value displayed with sparkle icon

### 2. Smart Fallbacks
- Stock photos when listing has no image
- Graceful handling of missing data
- Error handling for failed image loads

### 3. Mobile Optimized
- Responsive badge sizes
- Touch-friendly click targets
- Optimized for iOS Safari

### 4. Interactive
- Click card to open original listing
- Save/unsave functionality
- Smooth transitions and hover effects

## iOS Deployment

To build and deploy to iOS:

```bash
# Navigate to project directory
cd Backlist---Web-UI

# Install dependencies
npm install

# Build the project
npm run build

# Sync with Capacitor
npm run cap:sync

# Open in Xcode
npm run ios:open
```

## Testing

The system has been tested with:
- Multiple listing sources (Craigslist, AutoTrader, Cars.com)
- Various margin ranges (-50% to +100%)
- Missing/broken images
- Mobile Safari on iOS devices

## Future Enhancements

Potential improvements:
- Filter by deal grade
- Sort by margin/deal quality
- Push notifications for new "steal" deals
- Historical price tracking
- Deal quality analytics

---

**Date Integrated**: February 4, 2026  
**Source**: [GitHub - botbaby12/backlist (deal-rating-system branch)](https://github.com/botbaby12/backlist/tree/deal-rating-system)  
**Purpose**: Car deal evaluation and filtering for iOS mobile app
