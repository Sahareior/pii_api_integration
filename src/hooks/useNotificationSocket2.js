import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const useNotificationSocket2 = () => {
  const socketRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);
  
  // Get token from Redux store
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (err) {
        console.error("Error parsing saved notifications:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    
    const baseUrl = import.meta.env.VITE_WEBSOCKET_URL || "";
    if (!baseUrl) {
        console.warn("VITE_WEBSOCKET_URL is not defined in .env");
        return;
    }

    const wsUrl = `${baseUrl}notifications/?token=${accessToken}`;
    let socket = null;

    try {
        socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
          console.log("WebSocket connected ✅");
          setConnected(true);
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("Notification received:", data);
            
            if (data.type === "notifications.init") {
              const mappedItems = (data.items || []).map(item => ({
                ...item,
                desc: item.body,
                time: item.created_at,
                unread: !item.is_read
              }));
              setNotifications(mappedItems);
              localStorage.setItem("notifications", JSON.stringify(mappedItems));
            } else {
              // Single new notification
              const newNotification = {
                ...data,
                id: data.id || Date.now(),
                desc: data.body || data.message || "New notification",
                time: data.created_at || "Just now",
                unread: true
              };
              setNotifications((prev) => {
                const updated = [newNotification, ...prev];
                localStorage.setItem("notifications", JSON.stringify(updated));
                return updated;
              });
            }
          } catch (err) {
            console.error("Error parsing notification:", err, event.data);
          }
        };

        socket.onclose = (event) => {
          // Only update state if this is still the current socket instance
          if (socketRef.current === socket) {
            console.log("WebSocket disconnected ❌", event.code);
            setConnected(false);
            socketRef.current = null;
          }
        };

        socket.onerror = (error) => {
          if (socketRef.current === socket) {
            console.error("WebSocket error:", error);
            setConnected(false);
          }
        };
    } catch (error) {
        console.error("Failed to establish WebSocket connection:", error);
    }

    return () => {
      if (socket) {
        // Remove handlers before closing to prevent Strict Mode warnings
        socket.onopen = null;
        socket.onmessage = null;
        socket.onclose = null;
        socket.onerror = null;
        
        if (socket.readyState === WebSocket.CONNECTING || socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
        
        if (socketRef.current === socket) {
          socketRef.current = null;
        }
      }
    };
  }, [accessToken]);

  // Clear all notifications
  const markAllAsRead = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  return { notifications, connected, markAllAsRead };
};

export default useNotificationSocket2;


