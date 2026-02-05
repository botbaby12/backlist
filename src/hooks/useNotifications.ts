import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getNotificationHistory,
  clearNotificationHistory,
  ListingNotification,
} from '@/lib/notifications';

/**
 * React hook for managing notifications in components
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState<ListingNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Load notification history on mount
    loadNotifications();

    // Listen for new notifications
    const handleNewNotification = (event: Event) => {
      const customEvent = event as CustomEvent<ListingNotification>;
      const newNotification = customEvent.detail;

      // Add to list
      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Show a toast notification
      showToast(newNotification);
    };

    // Listen for navigation requests from notifications
    const handleNavigateToListing = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const listingId = customEvent.detail;

      // Navigate to listing detail (you'll need to create this route)
      navigate(`/listing/${listingId}`);
    };

    window.addEventListener('newListingNotification', handleNewNotification);
    window.addEventListener('navigateToListing', handleNavigateToListing);

    return () => {
      window.removeEventListener('newListingNotification', handleNewNotification);
      window.removeEventListener('navigateToListing', handleNavigateToListing);
    };
  }, [navigate]);

  const loadNotifications = () => {
    const history = getNotificationHistory();
    setNotifications(history);
    // Calculate unread (you could add a 'read' flag to the notification)
    setUnreadCount(history.length > 0 ? 1 : 0);
  };

  const clearAll = () => {
    clearNotificationHistory();
    setNotifications([]);
    setUnreadCount(0);
  };

  const markAsRead = () => {
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    clearAll,
    markAsRead,
    refresh: loadNotifications,
  };
}

/**
 * Show a toast notification for new listings
 */
function showToast(notification: ListingNotification) {
  // This will use the sonner toast library that's already in the project
  // You can import and use it in your components
  const savings = notification.estimatedValue - notification.price;
  const message = `${notification.title} - Save $${savings.toLocaleString()}!`;

  // Dispatch a toast event that the App component can listen to
  window.dispatchEvent(
    new CustomEvent('showToast', {
      detail: {
        title: notification.dealGrade === 'steal' ? '🔥 New Steal Deal!' : '💰 New Deal',
        description: message,
        action: {
          label: 'View',
          onClick: () => {
            window.dispatchEvent(
              new CustomEvent('navigateToListing', { detail: notification.listingId })
            );
          },
        },
      },
    })
  );
}
