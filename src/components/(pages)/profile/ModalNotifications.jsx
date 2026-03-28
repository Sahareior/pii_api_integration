import React from "react";
import {
  FiBell,
  FiX,
  FiCheckCircle,
  FiAlertTriangle,
  FiUsers,
  FiMessageSquare,
  FiShield,
  FiClock,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

const notifications = [
  {
    title: "New Business Registration",
    desc: "TechCorp Solutions has registered on the platform",
    time: "2 minutes ago",
    color: "bg-blue-100 text-blue-600",
    icon: <FaBuilding size={16} />,
    unread: true,
  },
  {
    title: "Payment Received",
    desc: "Digital Marketing Pro upgraded to Professional plan - $99",
    time: "15 minutes ago",
    color: "bg-green-100 text-green-600",
    icon: <FiCheckCircle size={16} />,
    unread: true,
  },
  {
    title: "Failed Login Attempt",
    desc: "Suspicious login attempt from unknown location detected",
    time: "1 hour ago",
    color: "bg-red-100 text-red-600",
    icon: <FiAlertTriangle size={16} />,
    unread: true,
  },
  {
    title: "New Team Members Added",
    desc: "StartupHub Inc added 5 new team members",
    time: "2 hours ago",
    color: "bg-purple-100 text-purple-600",
    icon: <FiUsers size={16} />,
    unread: false,
  },
  {
    title: "Message Flagged for Review",
    desc: "A message in #general channel requires moderation",
    time: "3 hours ago",
    color: "bg-yellow-100 text-yellow-600",
    icon: <FiMessageSquare size={16} />,
    unread: false,
  },
  {
    title: "Database Backup Completed",
    desc: "Scheduled backup completed successfully",
    time: "5 hours ago",
    color: "bg-green-100 text-green-600",
    icon: <FiCheckCircle size={16} />,
    unread: false,
  },
  {
    title: "Trial Expiring Soon",
    desc: "5 businesses have trials expiring in the next 3 days",
    time: "6 hours ago",
    color: "bg-orange-100 text-orange-600",
    icon: <FiClock size={16} />,
    unread: false,
  },
  {
    title: "2FA Enabled",
    desc: "Global Ventures enabled two-factor authentication",
    time: "1 day ago",
    color: "bg-blue-100 text-blue-600",
    icon: <FiShield size={16} />,
    unread: false,
  },
];



const NotificationItem = ({ item }) => {
  return (
    <div className="flex justify-between items-start gap-3 py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.color}`}
        >
          {item.icon}
        </div>

        <div>
          <p className="text-[16px] rob font-normal text-gray-900">
            {item.title}
          </p>
          <p className="text-xs rob text-gray-500">
            {item.desc}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {item.time}
          </p>
        </div>
      </div>

      {item.unread && (
        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
      )}
    </div>
  );
};

const ModalNotifications = ({ onClose }) => {
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
              3 unread
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button className="text-gray-500 hover:text-black">
              Mark all read
            </button>

          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto px-5">
          {notifications.map((item, index) => (
            <NotificationItem key={index} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 ">
          <button className="w-full border rounded-lg py-2 text-sm hover:bg-gray-50">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNotifications;
