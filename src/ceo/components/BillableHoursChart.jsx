import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Engineering", billable: 900, nonbillable: 300 },
  { name: "Marketing", billable: 600, nonbillable: 300 },
  { name: "Sales", billable: 800, nonbillable: 200 },
  { name: "HR", billable: 500, nonbillable: 150 },
];

const BillableHoursChart = () => {
  return (
    <>
      <h3 style={{ color: "#007BFF", marginBottom: "10px" }}>Billable vs Non-Billable Hours</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="billable" fill="#4B0082" name="Billable" />
          <Bar dataKey="nonbillable" fill="#8884d8" name="Non-Billable" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BillableHoursChart;
