import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { department: "Engineering", hours: 120 },
  { department: "Marketing", hours: 90 },
  { department: "Sales", hours: 75 },
];

const DepartmentHoursChart = () => (
  <div style={{ height: 300 }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="department" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="hours" fill="#0d6efd" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default DepartmentHoursChart;
