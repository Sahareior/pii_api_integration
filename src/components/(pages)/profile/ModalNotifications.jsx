import React from "react";
import {
  FiBell,
} from "react-icons/fi";
import { useMarkAllReadMutation } from "../../../redux/features/notification/notification.api";

const formatTime = (timeStr) => {
  if (!timeStr) return "Just now";
  try {
    const date = new Date(timeStr);
    if (isNaN(date.getTime())) return timeStr;

    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined
    });
  } catch (err) {
    return timeStr;
  }
};

// Hardcoded notifications removed. Now using props.



const NotificationItem = ({ item }) => {
  const defaultIcon = <FiBell size={16} />;
  const defaultColor = "bg-gray-100 text-gray-600";

  return (
    <div className="flex justify-between items-start gap-3 py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.color || defaultColor}`}
        >
          {item.icon || defaultIcon}
        </div>

        <div>
          <p className="text-[16px] rob font-normal text-gray-900">
            {item.title}
          </p>
          <p className="text-xs rob text-gray-500">
            {item.desc || item.message || "New notification"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {formatTime(item.time)}
          </p>
        </div>
      </div>

      {item.unread && (
        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
      )}
    </div>
  );
};

const ModalNotifications = ({ notifications = [], markAllAsRead }) => {
  const [markAllReadMutation] = useMarkAllReadMutation();

  const handleMarkAllRead = async () => {
    try {
      await markAllReadMutation().unwrap();
      markAllAsRead(); // Clear local socket state
    } catch (err) {
      console.error("Failed to mark all read:", err);
    }
  };

  return (
    <div className="">
      <div className="bg-white h-[80vh] overflow-y-auto flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <div>
            <div className="flex items-center gap-2">
              <FiBell size={22} />
              <h2 className=" font-medium text-xl rob text-gray-900">
                Notifications
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={handleMarkAllRead}
              className="text-gray-500 hover:text-black transition-colors"
            >
              Mark all read
            </button>

          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto px-5">
          {notifications.length > 0 ? (
            notifications.map((item, index) => (
              <NotificationItem key={item.id || index} item={item} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10 text-gray-400">
              <FiBell size={40} className="mb-2 opacity-20" />
              <p className="text-sm rob font-medium">No new notifications</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {/* <div className="p-4 ">
          <button className="w-full border rounded-lg py-2 text-sm hover:bg-gray-50">
            View All Activity
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ModalNotifications;
