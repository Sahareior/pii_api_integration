import { FiBell } from "react-icons/fi";
import { useMarkAllReadMutation } from "../../../redux/features/notification/notification.api";

const formatTime = (timeStr) => {
  const date = new Date(timeStr);
  if (isNaN(date)) return timeStr;

  const diff = Date.now() - date.getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);

  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  if (d < 7) return `${d}d ago`;

  return date.toLocaleDateString();
};

const NotificationItem = ({ item }) => (
  <div className="flex justify-between gap-3 py-4">
    <div className="flex gap-3">
      <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
        <FiBell size={16} />
      </div>

      <div>
        <p className="text-[15px] text-gray-900">{item.title}</p>
        <p className="text-xs text-gray-500">{item.desc}</p>
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

const ModalNotifications = ({
  notifications,
  markAllAsReadLocal,
  unreadCount,
}) => {
  const [markAllReadMutation, { isLoading }] =
    useMarkAllReadMutation();

  // Sort: unread first
  const sortedNotifications = [
    ...notifications.filter((n) => n.unread),
    ...notifications.filter((n) => !n.unread),
  ];

  const handleMarkAllRead = async () => {
    try {
      await markAllReadMutation().unwrap();
      markAllAsReadLocal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex justify-between px-5 py-4 border-b">
        <div className="flex items-center gap-2">
          <FiBell size={20} />
          <h2 className="text-lg font-medium">Notifications</h2>
        </div>

        <button
          onClick={handleMarkAllRead}
          disabled={isLoading || unreadCount === 0}
          className={`text-sm ${unreadCount === 0
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:text-black"
            }`}
        >
          {isLoading ? "Loading..." : "Mark all read"}
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5">
        {sortedNotifications.length ? (
          sortedNotifications.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalNotifications;