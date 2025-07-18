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
  { department: "Engineering", hours: 120 },
  { department: "Marketing", hours: 98 },
  { department: "Sales", hours: 85 },
];

const DepartmentHoursChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip
            wrapperStyle={{ zIndex: 1000 }} // prevent chart shift
            contentStyle={{ fontSize: "14px" }}
          />
          <Bar dataKey="hours" fill="#0d6efd" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentHoursChart;
