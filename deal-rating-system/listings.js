const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Direct connection to car_listings collection (raw MongoDB collection, not a model)
const getListingsCollection = () => {
  return mongoose.connection.db.collection('car_listings');
};

// GET /api/listings - Get all scraped listings from MongoDB
router.get('/', async (req, res) => {
  try {
    const { 
      limit = 100, 
      page = 1,
      search = '',
      source = '', // 'cars.com', 'autotrader', 'craigslist'
      minMargin,
      maxPrice,
      minPrice
    } = req.query;

    const collection = getListingsCollection();
    const query = {};

    // Filter by source
    if (source) {
      query.source = source;
    }

    // Filter by search term (title, make, model)
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { make: searchRegex },
        { model: searchRegex }
      ];
    }

    // Filter by price range
    if (minPrice) {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }
    if (maxPrice) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    // Filter by margin (only if predicted_price exists)
    if (minMargin) {
      query.predicted_price = { $exists: true, $ne: null };
      // We'll filter margin after fetching since it needs to be calculated
    }

    const skip = (Number(page) - 1) * Number(limit);

    // Fetch listings
    const listings = await collection
      .find(query)
      .sort({ scraped_at: -1 })
      .skip(skip)
      .limit(Number(limit))
      .toArray();

    const total = await collection.countDocuments(query);

    // Transform to frontend format and calculate margins
    const transformedListings = listings
      .map(listing => {
        const price = parseFloat(listing.price) || 0;
        const predictedPrice = parseFloat(listing.predicted_price) || 0;
        const margin = price > 0 && predictedPrice > 0 
          ? ((predictedPrice - price) / price) * 100 
          : 0;

        // Skip if margin filter is set and doesn't meet criteria
        if (minMargin && margin < Number(minMargin)) {
          return null;
        }

        return {
          id: listing._id || listing.listing_id,
          title: listing.title || 'Unknown',
          price: price,
          estimatedValue: predictedPrice,
          mileage: parseInt(listing.miles) || 0,
          location: [listing.city, listing.state].filter(Boolean).join(', ') || 'Unknown',
          postedDate: listing.scraped_at || listing.date_processed || new Date().toISOString(),
          source: listing.source || 'unknown',
          imageUrl: (listing.images && listing.images[0]) || listing.image_1 || '',
          originalUrl: listing.url || '',
          // 🎯 DEAL RATING SYSTEM - Assigns grade based on profit margin
          dealGrade: predictedPrice > 0 
            ? (margin >= 20 ? 'steal' : margin >= 10 ? 'great' : margin >= 2 ? 'good' : margin >= -10 ? 'fair' : 'pass') 
            : null,
          year: parseInt(listing.year) || 0,
          transmission: listing.transmission || '',
          margin: Math.round(margin),
          vin: listing.vin || '',
          exterior: listing.exterior || '',
          interior: listing.interior || '',
          make: listing.make || '',
          model: listing.model || ''
        };
      })
      .filter(listing => listing !== null);

    res.json({
      listings: transformedListings,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
        returned: transformedListings.length
      }
    });

  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({
      error: 'Failed to fetch listings',
      message: error.message
    });
  }
});

// GET /api/listings/stats - Get listing statistics
router.get('/stats', async (req, res) => {
  try {
    const collection = getListingsCollection();

    const total = await collection.countDocuments();
    const carscom = await collection.countDocuments({ source: 'cars.com' });
    const autotrader = await collection.countDocuments({ source: 'autotrader' });
    const craigslist = await collection.countDocuments({ source: 'craigslist' });

    // Get listings with predictions for margin calculation
    const listingsWithPredictions = await collection
      .find({ predicted_price: { $exists: true, $ne: null } })
      .toArray();

    let totalMargin = 0;
    let steals = 0;

    listingsWithPredictions.forEach(listing => {
      const price = parseFloat(listing.price) || 0;
      const predicted = parseFloat(listing.predicted_price) || 0;
      if (price > 0 && predicted > 0) {
        const margin = ((predicted - price) / price) * 100;
        totalMargin += margin;
        if (margin >= 20) steals++;
      }
    });

    const avgMargin = listingsWithPredictions.length > 0 
      ? Math.round(totalMargin / listingsWithPredictions.length)
      : 0;

    res.json({
      total,
      sources: {
        carscom,
        autotrader,
        craigslist
      },
      withPredictions: listingsWithPredictions.length,
      steals,
      avgMargin
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      error: 'Failed to fetch stats',
      message: error.message 
    });
  }
});

// GET /api/listings/:id - Get single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const collection = getListingsCollection();
    
    // Try to find by _id or listing_id
    const listing = await collection.findOne({
      $or: [
        { _id: req.params.id },
        { listing_id: req.params.id }
      ]
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(listing);

  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({
      error: 'Failed to fetch listing',
      message: error.message
    });
  }
});

module.exports = router;
