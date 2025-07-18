import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Alice", hours: 40 },
  { name: "Bob", hours: 32 },
  { name: "Charlie", hours: 45 },
];

const EmployeeTimeline = () => (
  <div style={{ height: 300 }}>
    <ResponsiveContainer width="100%" height="100%" debounce={1}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />  
        <Bar dataKey="hours" fill="#0d6efd" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default EmployeeTimeline;
