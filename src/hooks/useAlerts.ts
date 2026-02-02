import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_CONFIG } from "@/config/socketConfig";
import type { Listing } from "@/types/listing";

export interface Alert extends Listing {
  receivedAt: string;
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_CONFIG.serverUrl, {
      reconnectionAttempts: SOCKET_CONFIG.reconnectionAttempts,
      reconnectionDelay: SOCKET_CONFIG.reconnectionDelay,
      transports: ["websocket", "polling"],
    });

    newSocket.on(SOCKET_CONFIG.events.connect, () => {
      console.log("Connected to alerts server");
      setIsConnected(true);
    });

    newSocket.on(SOCKET_CONFIG.events.disconnect, () => {
      console.log("Disconnected from alerts server");
      setIsConnected(false);
    });

    newSocket.on(SOCKET_CONFIG.events.newAlert, (alertData: Listing) => {
      console.log("New alert received:", alertData);
      const alert: Alert = {
        ...alertData,
        receivedAt: new Date().toISOString(),
      };
      setAlerts((prev) => [alert, ...prev]);
    });

    newSocket.on(SOCKET_CONFIG.events.error, (error: Error) => {
      console.error("Socket error:", error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  return {
    alerts,
    isConnected,
    clearAlerts,
    dismissAlert,
    socket,
  };
}
