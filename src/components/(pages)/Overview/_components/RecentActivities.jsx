import React from "react";

const ActivityItem = ({ title, description, time, color }) => {
  return (
    <div className="flex justify-between items-start py-4 border-b last:border-b-0">
      <div className="flex gap-3">
        {/* Status Dot */}
        <span
          className={`mt-2 w-2.5 h-2.5 rounded-full`}
          style={{ backgroundColor: color }}
        />

        <div>
          <p className="text-[15px] rob font-normal text-gray-900">
            {title}
          </p>
          <p className="text-[15px] rob text-[#717182]">
            {description}
          </p>
        </div>
      </div>

      <p className="text-xs rob text-gray-400 whitespace-nowrap">
        {time}
      </p>
    </div>
  );
};

const RecentActivities = ({ activities }) => {
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white border border-[#60606080]/50 rounded-xl p-6 shadow-sm w-full">
      {/* Header */}
      
      <h2 className="text-lg rob font-normal text-gray-900">
        Recent Activity
      </h2>
      <p className="text-sm rob italic text-gray-500 my-5">
        Latest updates from across the platform
      </p>

      {/* Activity List */}
      <div>
        {activities?.map((activity) => (
          <ActivityItem
            key={activity.id}
            title={activity.business_name}
            description={activity.description}
            time={getTimeAgo(activity.timestamp)}
            color={activity.action.toLowerCase().includes("joined") ? "#16A34A" : "#3B82F6"}
          />
        ))}
        {(!activities || activities.length === 0) && (
          <p className="text-gray-500 text-center py-4 italic">No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
