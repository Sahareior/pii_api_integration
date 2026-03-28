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

const RecentActivities = () => {
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
        <ActivityItem
          title="TechCorp Solutions"
          description="New business registered"
          time="2 minutes ago"
          color="#16A34A" // green
        />

        <ActivityItem
          title="StartupHub Inc"
          description="Reached message limit"
          time="1 hour ago"
          color="#EAB308" // yellow
        />

        <ActivityItem
          title="Global Ventures"
          description="Added 5 new team members"
          time="2 hours ago"
          color="#16A34A" // green
        />
      </div>
    </div>
  );
};

export default RecentActivities;
