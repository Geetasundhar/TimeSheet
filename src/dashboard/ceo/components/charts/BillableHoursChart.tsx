import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ✅ Data values (no change needed here)
const data = [
  { week: "Week 1", billable: 32 },
  { week: "Week 2", billable: 45 },
  { week: "Week 3", billable: 38 },
  { week: "Week 4", billable: 50 },
];

const BillableHoursChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%" debounce={1}>  
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          {/* ✅ Animation disabled to stop shake */}
          <Bar dataKey="billable" fill="#0d6efd" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BillableHoursChart;
