import React, { useState } from 'react';

export default function FullCalendarApp() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [monthYearSelectVisible, setMonthYearSelectVisible] = useState(false);
  const [formData, setFormData] = useState({
    projectType: '',
    projectName: '',
    phase: '',
    task: '',
    hours: ''
  });
  const [entries, setEntries] = useState({});

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay() || 7;
  const totalDays = endOfMonth.getDate();

  const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setFormVisible(true);
  };

  const handleCancel = () => {
    setFormVisible(false);
    setSelectedDate(null);
    setFormData({
      projectType: '',
      projectName: '',
      phase: '',
      task: '',
      hours: ''
    });
  };

  const handleAdd = () => {
    if (!formData.projectType || !formData.projectName || !formData.phase || !formData.task || !formData.hours) return;

    const dateKey = selectedDate.toDateString();
    const newEntry = { ...formData };

    setEntries((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEntry]
    }));

    handleCancel();
  };

  const handleMonthYearChange = () => {
    const newMonth = parseInt(document.getElementById("monthSelect").value);
    const newYear = parseInt(document.getElementById("yearSelect").value);
    setCurrentDate(new Date(newYear, newMonth, 1));
    setMonthYearSelectVisible(false);
  };

  const renderCalendar = () => {
    const boxes = [];
    for (let i = 1; i < startDay; i++) {
      boxes.push(<div key={`empty-${i}`} className="calendar-box empty" />);
    }
    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = dateObj.toDateString();
      const isSelected = selectedDate && dateKey === selectedDate.toDateString();

      boxes.push(
        <div
          key={day}
          className={`calendar-box ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(dateObj)}
        >
          <div className="day-number">{day}</div>
          {entries[dateKey] && (
            <div className="entry">
              {entries[dateKey].map((entry, idx) => (
                <div key={idx} className="entry-item">
                  <span className="type">{entry.projectType}</span> - {entry.task} ({entry.hours}h)
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return boxes;
  };

  return (
    <div className="container">
      <div className="calendar-box-wrapper">
        <div className="calendar-header">
          <button onClick={handlePrev}>&lt;</button>
          <h2 onClick={() => setMonthYearSelectVisible(!monthYearSelectVisible)}>
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </h2>
          <button onClick={handleNext}>&gt;</button>
        </div>

        {monthYearSelectVisible && (
          <div className="month-year-picker">
            <select id="monthSelect" defaultValue={currentDate.getMonth()}>
              {Array.from({ length: 12 }, (_, idx) => (
                <option value={idx} key={idx}>
                  {new Date(0, idx).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <select id="yearSelect" defaultValue={currentDate.getFullYear()}>
              {Array.from({ length: 20 }, (_, idx) => (
                <option value={2020 + idx} key={idx}>{2020 + idx}</option>
              ))}
            </select>
            <button onClick={handleMonthYearChange}>Go</button>
          </div>
        )}

        <div className="days-row">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-name">{day}</div>
          ))}
        </div>

        <div className={`calendar-grid ${selectedDate ? 'blur-others' : ''}`}>
          {renderCalendar()}
        </div>
      </div>

      {formVisible && (
        <div className="form-popup">
          <h3>Log Work - {selectedDate.toDateString()}</h3>

          {[
            { label: 'Project Type', key: 'projectType', options: ['Billable', 'Internal'] },
            { label: 'Project Name', key: 'projectName', options: ['Timesheet Website', 'EMS', 'PMS'] },
            { label: 'Phase', key: 'phase', options: ['Design', 'Development', 'Testing'] },
            { label: 'Task', key: 'task', options: ['Coding', 'Review', 'Docs'] }
          ].map((field) => (
            <div className="form-group" key={field.key}>
              <label>{field.label}:</label>
              <select value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}>
                <option value="">Select</option>
                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          ))}

          <div className="form-group">
            <label>Hours Worked:</label>
            <input
              type="number"
              min="0"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
            />
          </div>

          <div className="button-group">
            <button onClick={handleCancel} className="cancel-btn" type="button">Cancel</button>
            <button onClick={handleAdd} className="add-btn" type="button">Add</button>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }

        .container {
          font-family: 'Segoe UI', sans-serif;
          padding: 40px;
          background-color: #eef2f7;
          min-height: 100vh;
          display: flex;
          justify-content: center;
        }

        .calendar-box-wrapper {
          width: 100%;
          max-width: 950px;
          background: #ffffff;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .calendar-header h2 {
          cursor: pointer;
          font-size: 24px;
          font-weight: 600;
          color: #333;
        }

        .calendar-header button {
          background: #4a90e2;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 16px;
          transition: background 0.3s;
        }

        .calendar-header button:hover {
          background: #357ac9;
        }

        .month-year-picker {
          display: flex;
          gap: 12px;
          margin: 16px 0;
        }

        .month-year-picker select,
        .month-year-picker button {
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        .month-year-picker button {
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }

        .days-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-top: 20px;
          font-weight: bold;
          text-align: center;
          color: #333;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
          margin-top: 12px;
        }

        .calendar-box {
          height: 160px;
          padding: 10px;
          background: #f5f7fa;
          border-radius: 10px;
          position: relative;
          cursor: pointer;
          overflow-y: auto;
          transition: 0.3s ease all;
          border: 1px solid #e0e6ed;
        }

        .calendar-box:hover {
          background: #eaf3fe;
        }

        .calendar-box.selected {
          background-color: #d4ecff;
          border: 2px solid #3399ff;
        }

        .calendar-box.empty {
          background-color: transparent;
          pointer-events: none;
          border: none;
        }

        .day-number {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .form-popup {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 25px;
          border-radius: 14px;
          box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.15);
          z-index: 999;
          width: 90%;
          max-width: 500px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .form-popup h3 {
          margin-bottom: 20px;
          font-size: 20px;
          color: #333;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #444;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: #f9f9f9;
          font-size: 14px;
        }

        .button-group {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
        }

        .add-btn {
          background-color: #28a745;
          color: white;
        }

        .cancel-btn {
          background-color: #dc3545;
          color: white;
        }

        .add-btn,
        .cancel-btn {
          padding: 10px 18px;
          font-size: 14px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .add-btn:hover {
          background-color: #218838;
        }

        .cancel-btn:hover {
          background-color: #c82333;
        }

        .entry {
          font-size: 12px;
          margin-top: 8px;
        }

        .entry-item {
          background: #cfe9ff;
          padding: 6px 8px;
          border-radius: 6px;
          margin-bottom: 4px;
          font-size: 13px;
        }

        .entry-item .type {
          font-weight: 600;
          color: #2b6cb0;
        }

        .blur-others .calendar-box:not(.selected) {
          opacity: 0.3;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
