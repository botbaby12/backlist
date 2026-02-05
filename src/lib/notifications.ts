import { Capacitor } from '@capacitor/core';
import {
  PushNotifications,
  PushNotificationSchema,
  Token,
  ActionPerformed,
} from '@capacitor/push-notifications';

export interface ListingNotification {
  listingId: string;
  title: string;
  price: number;
  estimatedValue: number;
  dealGrade: 'steal' | 'good' | 'pass';
  imageUrl?: string;
  distance?: string;
}

/**
 * Initialize push notifications for the app.
 * Call this once when the app starts.
 */
export async function initializePushNotifications(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    console.log('Push notifications only work on native platforms');
    return;
  }

  try {
    // Request permission to use push notifications
    const permissionStatus = await PushNotifications.requestPermissions();

    if (permissionStatus.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      await PushNotifications.register();
    } else {
      console.warn('Push notification permission denied');
    }

    // Handle successful registration
    await PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
      // Send this token to your backend server
      sendTokenToBackend(token.value);
    });

    // Handle registration errors
    await PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error on registration: ' + JSON.stringify(error));
    });

    // Show notification when app is in foreground
    await PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push notification received: ', notification);

        // Parse the listing data from notification
        const listingData = parseNotificationData(notification.data);

        // You can show an in-app alert or update the UI
        handleForegroundNotification(notification, listingData);
      }
    );

    // Handle notification tap when app is in background
    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push notification action performed', notification);

        // Parse the listing data
        const listingData = parseNotificationData(notification.notification.data);

        // Navigate to the listing detail
        handleNotificationTap(listingData);
      }
    );

    console.log('Push notifications initialized successfully');
  } catch (error) {
    console.error('Error initializing push notifications:', error);
  }
}

/**
 * Parse notification data into listing information
 */
function parseNotificationData(data: any): ListingNotification | null {
  try {
    if (!data) return null;

    return {
      listingId: data.listingId || data.listing_id,
      title: data.title,
      price: parseFloat(data.price),
      estimatedValue: parseFloat(data.estimatedValue || data.estimated_value),
      dealGrade: data.dealGrade || data.deal_grade || 'pass',
      imageUrl: data.imageUrl || data.image_url,
      distance: data.distance,
    };
  } catch (error) {
    console.error('Error parsing notification data:', error);
    return null;
  }
}

/**
 * Handle notification when app is in foreground
 */
function handleForegroundNotification(
  notification: PushNotificationSchema,
  listingData: ListingNotification | null
): void {
  // Show a toast or in-app notification
  // You can use the sonner toast library that's already in the project
  if (listingData) {
    // Store the notification in local state or preferences
    storeNotification(listingData);

    // Dispatch a custom event that the UI can listen to
    window.dispatchEvent(
      new CustomEvent('newListingNotification', { detail: listingData })
    );
  }
}

/**
 * Handle notification tap - navigate to listing
 */
function handleNotificationTap(listingData: ListingNotification | null): void {
  if (listingData && listingData.listingId) {
    // Navigate to the listing detail page
    // Since we're using React Router, we'll dispatch an event
    window.dispatchEvent(
      new CustomEvent('navigateToListing', { detail: listingData.listingId })
    );
  }
}

/**
 * Store notification in local storage for history
 */
async function storeNotification(listing: ListingNotification): Promise<void> {
  try {
    const stored = localStorage.getItem('backlist_notifications');
    const notifications: ListingNotification[] = stored ? JSON.parse(stored) : [];

    // Add new notification at the beginning
    notifications.unshift(listing);

    // Keep only last 50 notifications
    const trimmed = notifications.slice(0, 50);

    localStorage.setItem('backlist_notifications', JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error storing notification:', error);
  }
}

/**
 * Send device token to your backend server
 * This is where you'll integrate with your scraper/backend
 */
async function sendTokenToBackend(token: string): Promise<void> {
  try {
    const platform = Capacitor.getPlatform(); // 'ios' or 'android'

    // Get user's preferences (if any) for notification filtering
    const preferences = getNotificationPreferences();

    // TODO: Replace with your actual backend endpoint
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://your-backend.com';

    const response = await fetch(`${backendUrl}/api/register-device`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        platform,
        preferences,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to register device: ${response.statusText}`);
    }

    console.log('Device token registered with backend successfully');
  } catch (error) {
    console.error('Error sending token to backend:', error);
    // Store token locally to retry later
    localStorage.setItem('pending_push_token', token);
  }
}

/**
 * Get notification preferences (could be expanded)
 */
function getNotificationPreferences(): any {
  try {
    const stored = localStorage.getItem('notification_preferences');
    return stored ? JSON.parse(stored) : {
      dealTypes: ['steal', 'good'], // Only notify for steals and good deals
      maxDistance: 50, // Miles
      minSavings: 2000, // Minimum $ below estimated value
    };
  } catch (error) {
    return {};
  }
}

/**
 * Update notification preferences
 */
export function updateNotificationPreferences(preferences: any): void {
  localStorage.setItem('notification_preferences', JSON.stringify(preferences));

  // Re-send token to backend with updated preferences
  const token = localStorage.getItem('pending_push_token');
  if (token) {
    sendTokenToBackend(token);
  }
}

/**
 * Get stored notification history
 */
export function getNotificationHistory(): ListingNotification[] {
  try {
    const stored = localStorage.getItem('backlist_notifications');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting notification history:', error);
    return [];
  }
}

/**
 * Clear notification history
 */
export function clearNotificationHistory(): void {
  localStorage.removeItem('backlist_notifications');
}
