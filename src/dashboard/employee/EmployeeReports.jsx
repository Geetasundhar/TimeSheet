// All imports
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function FullCalendarAppWithLayout() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [entries] = useState({}); // No adding entries from employee side

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay() || 7;
  const totalDays = endOfMonth.getDate();

  const handlePrev = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNext = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const renderCalendar = () => {
    const boxes = [];
    for (let i = 1; i < startDay; i++) {
      boxes.push(<div key={`empty-${i}`} className="border p-3 bg-transparent"></div>);
    }
    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = dateObj.toDateString();

      boxes.push(
        <div
          key={day}
          className="border rounded p-2 bg-light"
          style={{ height: '120px', overflowY: 'auto' }}
        >
          <div className="fw-bold">{day}</div>
          {entries[dateKey]?.map((entry, idx) => (
            <div key={idx} className="small">
              <strong>{entry.projectType}</strong> - {entry.task} ({entry.hours}h)
            </div>
          ))}
        </div>
      );
    }
    return boxes;
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-primary" onClick={handlePrev}>&lt; Prev</button>
        <h4>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h4>
        <button className="btn btn-outline-primary" onClick={handleNext}>Next &gt;</button>
      </div>
      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
        {daysOfWeek.map(day => <div key={day} className="fw-bold text-center">{day}</div>)}
        {renderCalendar()}
      </div>
    </div>
  );
}
