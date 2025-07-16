import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Project A", value: 40 },
  { name: "Project B", value: 25 },
  { name: "Project C", value: 20 },
  { name: "Project D", value: 15 },
];

// Professional blue shades
const COLORS = ["#0d6efd", "#1e3a8a", "#007bff", "#3399ff"];

const ProjectAllocationChart = () => (
  <div style={{ height: 300 }}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#0d6efd"
          dataKey="value"
          label={({ name }) => name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default ProjectAllocationChart;
