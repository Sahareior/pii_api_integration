import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";

const MAX_NOTIFICATIONS = 100;
const RECONNECT_DELAY = 3000;

const useNotificationSocket = (apiData) => {
  const socketRef = useRef(null);
  const reconnectRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);

  const accessToken = useSelector((state) => state.auth.accessToken);

  // ✅ Load from API (IMPORTANT FIX)
  useEffect(() => {
    if (apiData?.notifications) {
      const formatted = apiData.notifications.map((item) => ({
        id: item.id,
        title: item.title,
        desc: item.body,
        time: item.created_at,
        unread: !item.is_read,
      }));

      setNotifications(formatted.slice(0, MAX_NOTIFICATIONS));
    }
  }, [apiData]);

  // ✅ Add new notification (always on top)
  const addNotification = useCallback((newItem) => {
    setNotifications((prev) => {
      const exists = prev.some((n) => n.id === newItem.id);
      if (exists) return prev;

      return [newItem, ...prev].slice(0, MAX_NOTIFICATIONS);
    });
  }, []);

  // ✅ WebSocket
  const connect = useCallback(() => {
    if (!accessToken) return;

    const baseUrl = import.meta.env.VITE_WEBSOCKET_URL;
    if (!baseUrl) return;

    const ws = new WebSocket(
      `${baseUrl}notifications/?token=${accessToken}`
    );

    socketRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "notifications.init") return;

        addNotification({
          id: data.id || Date.now(),
          title: data.title || "Notification",
          desc: data.body || data.message,
          time: data.created_at || new Date().toISOString(),
          unread: true,
        });
      } catch (err) {
        console.error(err);
      }
    };

    ws.onclose = () => {
      setConnected(false);
      reconnectRef.current = setTimeout(connect, RECONNECT_DELAY);
    };

    ws.onerror = () => ws.close();
  }, [accessToken, addNotification]);

  useEffect(() => {
    connect();
    return () => {
      socketRef.current?.close();
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
    };
  }, [connect]);

  // ✅ Mark all as read (FIXED)
  const markAllAsReadLocal = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, unread: false }))
    );
  };

  return {
    notifications,
    setNotifications,
    connected,
    markAllAsReadLocal,
  };
};

export default useNotificationSocket;