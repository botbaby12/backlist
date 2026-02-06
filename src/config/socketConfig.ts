// Socket.io configuration for car deal alerts
// Uses same-origin connection via nginx proxy

export const SOCKET_CONFIG = {
  // Same-origin WebSocket server (proxied via nginx)
  serverUrl: '',
  
  // Reconnection settings
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  
  // Event names
  events: {
    newAlert: 'new_alert',
    connect: 'connect',
    disconnect: 'disconnect',
    error: 'error',
  },
} as const;
