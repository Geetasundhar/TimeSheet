import React from "react";

const data = [
  { name: "Alice", hours: 38 },
  { name: "Bob", hours: 35 },
  { name: "John", hours: 33 },
];

const TopOvertimeEmployees = () => {
  return (
    <div>
      <h3 style={{ color: "#007BFF" }}>Top Overtime Contributors</h3>
      <ul>
        {data.map((emp, index) => (
          <li key={index}>
            {emp.name} — <strong>{emp.hours} hrs</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopOvertimeEmployees;
