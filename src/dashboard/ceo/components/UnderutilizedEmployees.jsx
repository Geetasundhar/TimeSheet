import React from "react";

const data = [
  { name: "Priya", avg: "3.1 hrs/day" },
  { name: "Ravi", avg: "2.8 hrs/day" },
];

const UnderutilizedEmployees = () => {
  return (
    <div>
      <h3 style={{ color: "#ffc107" }}>Underutilized Employees</h3>
      <ul>
        {data.map((emp, index) => (
          <li key={index}>
            {emp.name} — <strong>{emp.avg}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnderutilizedEmployees;
