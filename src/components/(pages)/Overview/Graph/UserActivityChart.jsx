import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", users: 2200 },
  { day: "Tue", users: 2800 },
  { day: "Wed", users: 3100 },
  { day: "Thu", users: 2900 },
  { day: "Fri", users: 3500 },
  { day: "Sat", users: 1800 },
  { day: "Sun", users: 1500 },
];

const UserActivityChart = () => {
  return (
    <div className="bg-white rounded-xl border border-[#60606080]/50 p-6 w-full max-w-3xl">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">
        User Activity
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Active users per day (last 7 days)
      </p>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              domain={[0, 3600]}
            />
            <Tooltip />
            <Bar
              dataKey="users"
              fill="#000000"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserActivityChart;
