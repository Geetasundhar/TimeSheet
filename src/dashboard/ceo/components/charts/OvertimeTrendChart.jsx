import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { week: "Week 1", hours: 5 },
  { week: "Week 2", hours: 8 },
  { week: "Week 3", hours: 12 },
  { week: "Week 4", hours: 7 },
];

const OvertimeTrendChart = () => (
  <div style={{ height: 300 }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="hours"
          stroke="#007bff"
          strokeWidth={3}
          dot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default OvertimeTrendChart;
