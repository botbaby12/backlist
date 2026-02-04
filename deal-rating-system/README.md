# Deal Rating System

This branch contains the deal rating system that calculates and assigns grades to car listings based on profit margin.

## Overview

The deal rating system compares the predicted price (from ML model) with the actual sale price to calculate a profit margin, then assigns a grade from "steal" to "pass".

## Files

- `listings.js` - API route with deal rating logic (lines 92-94)
- `ListingCard.tsx` - React component that displays the deal rating badge

## Deal Rating Formula

```javascript
margin = ((predictedPrice - salePrice) / salePrice) * 100
```

## Rating Grades

| Grade | Margin | Description |
|-------|---------|-------------|
| 🔥 **Steal** | ≥ 20% | Predicted price is 20%+ higher than asking price |
| ✨ **Great** | 10-19% | Predicted price is 10-19% higher |
| 👍 **Good** | 2-9% | Predicted price is 2-9% higher |
| 📊 **Fair** | -10% to 1% | Within 10% of predicted price |
| ❌ **Pass** | < -10% | Asking price is much higher than predicted |

## Implementation

### Backend (listings.js)

```javascript
dealGrade: predictedPrice > 0 
  ? (margin >= 20 ? 'steal' : margin >= 10 ? 'great' : margin >= 2 ? 'good' : margin >= -10 ? 'fair' : 'pass') 
  : null,
```

The API endpoint `/api/listings` returns listings with calculated margins and deal grades. It supports filtering by:
- `minMargin` - Only show deals above a certain margin
- `maxPrice` - Filter by maximum price
- `source` - Filter by data source (cars.com, autotrader, craigslist)
- `search` - Search by title, make, or model

### Frontend (ListingCard.tsx)

The `ListingCard` component displays car listings with:
- Deal badge showing the grade (via `DealBadge` component)
- Source icon
- Price and estimated value
- Location and mileage

## Usage Example

### API Request
```bash
# Get all great deals (10%+ margin)
GET /api/listings?minMargin=10&limit=50

# Get stats
GET /api/listings/stats
```

### API Response
```json
{
  "listings": [{
    "id": "...",
    "title": "2020 Honda Civic",
    "price": 15000,
    "estimatedValue": 20000,
    "margin": 33,
    "dealGrade": "steal",
    "mileage": 45000,
    "location": "San Francisco, CA",
    ...
  }],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 50
  }
}
```

## Integration

This system is designed to work with:
- MongoDB collection `car_listings` (scraped listing data)
- Prediction model that provides `predicted_price`
- Web/mobile frontend that displays deal grades

## Deployed Version

Currently running on Digital Ocean at:
- **API**: http://159.223.113.123:3000/api/listings

---

**Date Added**: February 4, 2026  
**Purpose**: Car deal evaluation and filtering
