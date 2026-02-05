# Push Notifications Setup Guide

This guide explains how to set up push notifications for the Backlist app and how to send notifications from your backend/scraper.

## Architecture Overview

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│  Your       │         │   Apple      │         │  Backlist   │
│  Backend/   │────────▶│   APNS/      │────────▶│  iOS App    │
│  Scraper    │         │   FCM        │         │             │
└─────────────┘         └──────────────┘         └─────────────┘
      │                                                  │
      │                                                  │
      └──────────────Device Registration─────────────────┘
```

## Phase 1: iOS Configuration (REQUIRED)

### 1. Apple Developer Account Setup

1. **Log into Apple Developer Console**
   - Go to: https://developer.apple.com/account/
   - Navigate to: Certificates, Identifiers & Profiles

2. **Create App Identifier**
   - Click on "Identifiers" → "+" button
   - Select "App IDs" → Continue
   - Description: "Backlist"
   - Bundle ID: `com.backlist.app` (this matches your capacitor.config.ts)
   - Capabilities: Check "Push Notifications"
   - Click "Continue" and "Register"

3. **Create APNs Key (Recommended Method)**
   - Go to "Keys" section → "+" button
   - Key Name: "Backlist Push Notifications"
   - Check "Apple Push Notifications service (APNs)"
   - Click "Continue" and "Register"
   - **IMPORTANT**: Download the `.p8` file immediately (you can't download it again!)
   - Note down:
     - Key ID (e.g., `ABC123DEF4`)
     - Team ID (found in top-right of developer portal)

4. **Add Push Notification Capability in Xcode**
   - Open: `ios/App/App.xcodeproj`
   - Select the "App" target
   - Go to "Signing & Capabilities" tab
   - Click "+ Capability" → Add "Push Notifications"
   - The capability should show "Push Notifications" with a checkbox

### 2. Configure Capacitor

The app is already configured in `capacitor.config.ts` with:
```typescript
appId: 'com.backlist.app'
```

## Phase 2: Backend Integration

### Option A: Using Firebase Cloud Messaging (Easiest)

Firebase handles both iOS (APNS) and Android (FCM) notifications.

#### Setup Steps:

1. **Create Firebase Project**
   ```bash
   # Go to https://console.firebase.google.com/
   # Create new project: "Backlist"
   ```

2. **Add iOS App**
   - Project Settings → Add app → iOS
   - Bundle ID: `com.backlist.app`
   - Download `GoogleService-Info.plist`
   - Upload your APNs `.p8` key to Firebase:
     - Settings → Cloud Messaging → iOS app configuration
     - Upload APNs Authentication Key
     - Enter Key ID and Team ID

3. **Install Firebase in Backend** (Node.js example)
   ```bash
   npm install firebase-admin
   ```

4. **Backend Code to Send Notifications**
   ```javascript
   // backend/notifications.js
   const admin = require('firebase-admin');
   const serviceAccount = require('./path/to/firebase-service-account.json');

   admin.initializeApp({
     credential: admin.credential.cert(serviceAccount)
   });

   /**
    * Send push notification for a new car listing
    */
   async function sendNewListingNotification(deviceToken, listing) {
     const message = {
       token: deviceToken,
       notification: {
         title: listing.dealGrade === 'steal' ? '🔥 New Steal Deal!' : '💰 New Deal',
         body: `${listing.title} - Save $${listing.estimatedValue - listing.price}!`,
       },
       data: {
         listingId: listing.id,
         title: listing.title,
         price: listing.price.toString(),
         estimatedValue: listing.estimatedValue.toString(),
         dealGrade: listing.dealGrade,
         imageUrl: listing.imageUrl || '',
         distance: listing.distance || '',
       },
       apns: {
         payload: {
           aps: {
             sound: 'default',
             badge: 1,
           },
         },
       },
     };

     try {
       const response = await admin.messaging().send(message);
       console.log('Successfully sent notification:', response);
       return response;
     } catch (error) {
       console.error('Error sending notification:', error);
       throw error;
     }
   }

   module.exports = { sendNewListingNotification };
   ```

5. **Create Device Registration Endpoint**
   ```javascript
   // backend/server.js (Express example)
   const express = require('express');
   const app = express();

   // Store device tokens in your database
   const db = require('./database'); // Your database connection

   app.post('/api/register-device', async (req, res) => {
     try {
       const { token, platform, preferences } = req.body;

       // Save to database
       await db.devices.upsert({
         token,
         platform,
         preferences,
         lastActive: new Date(),
       });

       res.json({ success: true });
     } catch (error) {
       console.error('Error registering device:', error);
       res.status(500).json({ error: 'Failed to register device' });
     }
   });

   app.listen(3000, () => {
     console.log('Backend server running on port 3000');
   });
   ```

6. **Integrate with Your Scraper**
   ```javascript
   // scraper/newListingHandler.js
   const { sendNewListingNotification } = require('../backend/notifications');
   const db = require('../database');

   async function onNewListingFound(listing) {
     // Calculate if it's a good deal
     const savings = listing.estimatedValue - listing.price;
     const dealGrade = savings > 3000 ? 'steal' : savings > 1500 ? 'good' : 'pass';

     listing.dealGrade = dealGrade;

     // Save listing to database
     await db.listings.insert(listing);

     // Get all registered devices that match preferences
     const devices = await db.devices.findAll({
       where: {
         'preferences.dealTypes': { $contains: dealGrade },
         'preferences.maxDistance': { $gte: parseDistance(listing.distance) },
       },
     });

     // Send notifications to all matching devices
     const notifications = devices.map((device) =>
       sendNewListingNotification(device.token, listing)
     );

     await Promise.allSettled(notifications);
     console.log(`Sent ${devices.length} notifications for listing ${listing.id}`);
   }

   function parseDistance(distanceStr) {
     // Parse "12 mi" to 12
     return parseInt(distanceStr);
   }

   module.exports = { onNewListingFound };
   ```

### Option B: Direct APNS (Advanced)

If you don't want to use Firebase, you can send directly to APNS.

1. **Install apn library**
   ```bash
   npm install apn
   ```

2. **Backend Code**
   ```javascript
   const apn = require('apn');

   const options = {
     token: {
       key: './path/to/AuthKey_ABC123DEF4.p8',
       keyId: 'ABC123DEF4',
       teamId: 'YOURTEAMID',
     },
     production: false, // Set to true for production
   };

   const apnProvider = new apn.Provider(options);

   async function sendIOSNotification(deviceToken, listing) {
     const notification = new apn.Notification();
     notification.expiry = Math.floor(Date.now() / 1000) + 3600; // 1 hour
     notification.badge = 1;
     notification.sound = 'ping.aiff';
     notification.alert = {
       title: listing.dealGrade === 'steal' ? '🔥 New Steal Deal!' : '💰 New Deal',
       body: `${listing.title} - Save $${listing.estimatedValue - listing.price}!`,
     };
     notification.payload = {
       listingId: listing.id,
       title: listing.title,
       price: listing.price.toString(),
       estimatedValue: listing.estimatedValue.toString(),
       dealGrade: listing.dealGrade,
       imageUrl: listing.imageUrl || '',
       distance: listing.distance || '',
     };
     notification.topic = 'com.backlist.app'; // Your bundle ID

     const result = await apnProvider.send(notification, deviceToken);
     console.log('Sent notification:', result);
     return result;
   }
   ```

## Phase 3: Environment Configuration

Update your `.env` file:

```bash
# .env
VITE_SUPABASE_PROJECT_ID="your-existing-id"
VITE_SUPABASE_PUBLISHABLE_KEY="your-existing-key"
VITE_SUPABASE_URL="your-existing-url"

# Add backend URL for notifications
VITE_BACKEND_URL="https://your-backend.com"
# or for local development:
# VITE_BACKEND_URL="http://localhost:3000"
```

## Phase 4: Testing

### Test on iOS Simulator (Doesn't Support Push)
iOS Simulator doesn't support push notifications. You must test on a real device.

### Test on Real iOS Device

1. **Build and run on device**
   ```bash
   npm run build:mobile
   npx cap open ios
   ```

2. **In Xcode:**
   - Select your physical iPhone from device dropdown
   - Click Run (⌘R)
   - When app launches, allow notifications

3. **Get Device Token:**
   - Check Xcode console for log: "Push registration success, token: ..."
   - Copy this token

4. **Test from Backend:**
   ```javascript
   const testToken = 'paste-device-token-here';
   const testListing = {
     id: '123',
     title: '2019 Honda Civic LX',
     price: 15500,
     estimatedValue: 18500,
     dealGrade: 'steal',
     imageUrl: 'https://example.com/image.jpg',
     distance: '12 mi',
   };

   sendNewListingNotification(testToken, testListing);
   ```

5. **Verify:**
   - Lock your iPhone
   - Wait 5-10 seconds
   - Notification should appear on lock screen

## Notification Data Format

When sending notifications from your backend, use this format:

```json
{
  "notification": {
    "title": "🔥 New Steal Deal!",
    "body": "2019 Honda Civic LX - Save $3,000!"
  },
  "data": {
    "listingId": "123",
    "title": "2019 Honda Civic LX",
    "price": "15500",
    "estimatedValue": "18500",
    "dealGrade": "steal",
    "imageUrl": "https://example.com/image.jpg",
    "distance": "12 mi"
  }
}
```

## Troubleshooting

### "Registration Error"
- Ensure Push Notifications capability is added in Xcode
- Check Bundle ID matches in both Xcode and Apple Developer Portal
- Verify APNs key is properly uploaded to Firebase

### "No Token Received"
- Must test on real device (Simulator doesn't support push)
- Check notification permissions were granted
- Restart app after adding Push capability

### "Notification Not Delivered"
- Verify token is valid and not expired
- Check backend logs for errors
- Ensure APNs key details (Key ID, Team ID) are correct
- Try sending test notification from Firebase Console

### "App Not Opening on Tap"
- The notification tap handler in `notifications.ts` dispatches a custom event
- The app's router needs to listen for this event (see `useNotifications` hook)

## Next Steps

1. ✅ Complete iOS configuration in Apple Developer Portal
2. ✅ Add Push Notifications capability in Xcode
3. ✅ Choose Firebase or direct APNS
4. ✅ Set up backend endpoint for device registration
5. ✅ Integrate notification sending with your scraper
6. ✅ Test on real device
7. ✅ Set up production Firebase project
8. ✅ Deploy backend with proper error handling

## Cost Estimate

- **Apple Developer Account**: $99/year (required)
- **Firebase**: Free tier includes 10M notifications/month
- **Alternative services**: OneSignal, Pusher, etc. have free tiers

## Security Notes

- Never commit your `.p8` APNs key to git
- Store Firebase service account JSON securely
- Validate device tokens before storing
- Implement rate limiting on registration endpoint
- Use HTTPS for all backend communication
