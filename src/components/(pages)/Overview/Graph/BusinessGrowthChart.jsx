import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 20 },
  { month: "Feb", value: 30 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 48 },
  { month: "May", value: 58 },
  { month: "Jun", value: 70 },
];

const BusinessGrowthChart = () => {
  return (
    <div className="bg-white rounded-xl border border-[#60606080]/50 p-6 w-full max-w-3xl">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">
        Business Growth
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        New businesses registered over time
      </p>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#000000"
              strokeWidth={2}
              dot={{ r: 4, fill: "#000000" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BusinessGrowthChart;
