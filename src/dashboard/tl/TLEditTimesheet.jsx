import React, { useState, useEffect } from 'react';
import TLsidebar from './TLsidebar';
import TLtopbar from './TLtopbar';
export default function TLEditTimesheet() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const currentUser = localStorage.getItem('currentUser'); // or however you're storing the logged-in user

  const [formVisible, setFormVisible] = useState(false);
  const [monthYearSelectVisible, setMonthYearSelectVisible] = useState(false);
  const [projectData, setProjectData] = useState(() => {
    const saved = localStorage.getItem('projectData');
    return saved ? JSON.parse(saved) : [];
  });
  const [formData, setFormData] = useState({
    projectType: '',
    projectName: '',
    phase: '',
    task: '',
    hours: '',
    description: '',
    isEditing: false,
    editIndex: null
  });
  const [entries, setEntries] = useState({});
const selectedProject = projectData.find(p => p.projectName === formData.projectName);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay() || 7;
  const totalDays = endOfMonth.getDate();
const [teamMembers, setTeamMembers] = useState([]);
const [selectedEmployee, setSelectedEmployee] = useState('');
const [calendarVisible, setCalendarVisible] = useState(true);
const [timesheetData, setTimesheetData] = useState([]);
const [sidebarOpen, setSidebarOpen] = useState(true);
const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const [sidebarVisible, setSidebarVisible] = useState(true); // 🔹 toggle state
const [setSelectedProject] = useState('');
const [availableTasks, setAvailableTasks] = useState([]);
const [selectedTask, setSelectedTask] = useState('');

// Load project data from localStorage
useEffect(() => {
  const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
  setProjectData(storedProjects);
}, []);

// Update tasks when a project is selected
const handleProjectChange = (e) => {
  const selectedIndex = parseInt(e.target.value);
  const selected = projectData[selectedIndex];
  setSelectedProject(selectedIndex);
  setAvailableTasks(selected?.tasks || []);
  setSelectedTask('');
};

useEffect(() => {
  const storedMembers = JSON.parse(localStorage.getItem('tl_team_members')) || [];
  setTeamMembers(storedMembers);
}, []);

useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem('timesheet_data')) || {};
  const employeeData = selectedEmployee ? storedData[selectedEmployee] || {} : {};
  setEntries(employeeData); // Set current entries for the selected employee
}, [selectedEmployee]);

const saveEntriesToStorage = (newEntries) => {
  const allData = JSON.parse(localStorage.getItem('timesheet_data')) || {};
  if (selectedEmployee) {
    allData[selectedEmployee] = newEntries;
    localStorage.setItem('timesheet_data', JSON.stringify(allData));
  }
};


useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('tl_team_members')) || [];
  setTeamMembers(stored);
}, []);

  const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

 const handleDateClick = (day) => {
  const dateKey = day.toDateString();
  const dayEntries = entries[dateKey] || [];

  setSelectedDate(day);
 if (!selectedEmployee) {
    alert("Please select an employee first.");
    return;
  }
setSelectedDate(day); // ✅ correct
  setFormVisible(true);
  if (dayEntries.length === 1) {
    // Only one entry exists — auto-fill form with it
    setFormData({
      ...dayEntries[0],
      isEditing: true,
      editIndex: 0
    });
  } else {
    // No entry or multiple — start fresh
    setFormData({
      projectType: '',
      projectName: '',
      phase: '',
      task: '',
      hours: '',
      description: '',
      isEditing: false,
      editIndex: null
    });
  }

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
      hours: '',
      description: '',
      isEditing: false,
      editIndex: null
    });
  };
const handleReject = (dateKey, index) => {
  setEntries((prev) => {
    const updated = { ...prev };
    updated[dateKey][index].rejected = true;
      saveEntriesToStorage(updated);  // <-- Add this

    return updated;
  });
};

  const handleAddOrUpdate = () => {
    if (!formData.projectType || !formData.projectName || !formData.phase || !formData.task || !formData.hours) return;

    const dateKey = selectedDate.toDateString();
    const newEntry = {
      ...formData,
      approved: false
    };

    setEntries((prev) => {
      const updated = { ...prev };
      const dayEntries = updated[dateKey] || [];

     if (formData.isEditing && formData.editIndex !== null) {
  dayEntries[formData.editIndex] = newEntry;
} else {
  const hourExists = dayEntries.some(entry => entry.hours === formData.hours);
  if (hourExists) {
    alert('An entry for this hour already exists on this day.');
    return;
  }
  dayEntries.push(newEntry);
}

      updated[dateKey] = dayEntries;
        saveEntriesToStorage(updated);  // <-- Add this

      return updated;
    });  // <-- Add this


    handleCancel();
  };

  const handleEdit = (dateKey, index) => {
    const entry = entries[dateKey][index];
    if (entry.approved) return;

    setSelectedDate(new Date(dateKey));
    setFormData({
      ...entry,
      isEditing: true,
      editIndex: index
    });
    setFormVisible(true);
  };
const handleApproveAll = () => {
  const dateKey = selectedDate?.toDateString();
  if (!dateKey || !entries[dateKey]) return;

  setEntries(prev => {
    const updated = { ...prev };
    updated[dateKey] = updated[dateKey].map(entry => ({
  ...entry,
  approved: true,
  rejected: false  // ✅ Remove rejection when approving all
}));  saveEntriesToStorage(updated);  // <-- Add this


    return updated;
  });
   // <-- Add this

  handleCancel(); // ✅ This line closes the form and refreshes the calendar
};

const handleApprove = (dateKey, index) => {
  setEntries((prev) => {
    const updated = { ...prev };
    updated[dateKey][index] = {
      ...updated[dateKey][index],
      approved: true,
      rejected: false  // ✅ Remove rejection when approving
    };  saveEntriesToStorage(updated);  // <-- Add this

    return updated;
  });
};
useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('projects')) || [];
  const normalized = stored.map(p => ({
    ...p,
    projectPhases: p.projectPhases || p.phases || [],
    tasks: (p.tasks || []).map(t => ({
      taskName: t.taskName || t.name,
      assignedTo: t.assignedTo || []
    }))
  }));
  setProjectData(normalized);
}, []);


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
  <div key={idx} className={`entry-item ${entry.rejected ? 'rejected' : ''}`}>
    <p><strong>{entry.projectType}</strong> - {entry.projectName}</p>
    <p>{entry.phase} - {entry.task} - {entry.hours} hr</p>
    <p>Description: {entry.description}</p>
    
    {entry.approved ? (
      <div>Status: Approved</div>
    ) : entry.rejected ? (
      <div>Status: Rejected</div>
    ) : (
      <div>
        <button onClick={() => handleEdit(dateKey, idx)}>Edit</button>
        <button onClick={() => handleApprove(dateKey, idx)}>Approve</button>
        <button onClick={() => handleReject(dateKey, idx)}>Reject</button>
      </div>
    )}
  </div>
))}

            </div>
          )}
        </div>
      );
    }
    return boxes;
  };
  const formFields = [
  {
    label: 'Project Type',
    key: 'projectType',
    options: Array.isArray(projectData)
      ? [...new Set(projectData.map(p => p.projectType).filter(Boolean))]
      : [],
  },
  {
    label: 'Project Name',
    key: 'projectName',
    options: Array.isArray(projectData)
      ? [...new Set(projectData.map(p => p.projectName).filter(Boolean))]
      : [],
  },
  {
    label: 'Phase',
    key: 'phase',
    options: Array.isArray(projectData)
      ? [...new Set(projectData.flatMap(p => p.projectPhases || []))]
      : [],
  },
  {
    label: 'Task',
    key: 'task',
    options: Array.isArray(projectData)
      ? [...new Set(
          projectData.flatMap(p =>
            Array.isArray(p.tasks)
              ? p.tasks.map(t => t.taskName).filter(Boolean)
              : []
          )
        )]
      : [],
  }
];


  return (
  <>
    <div style={{ display: 'flex' }}>
      {sidebarVisible && <TLsidebar />} {/* 🔹 Conditionally render sidebar */}
<div
  className="flex-grow-1"
  style={{
    marginLeft: sidebarVisible && window.innerWidth >= 992 ? '220px' : '0',
    padding: 0,
    transition: 'margin-left 0.3s ease',
  }}
>
        <TLtopbar onToggle={() => setSidebarVisible(!sidebarVisible)} /> {/* 🔹 Toggle callback */}
<br></br>    {/* 🟦 Header Section */}
        <div className="header-container">
  <div className="header-title">
    <h1>Timesheet Approval</h1><br></br>
  </div>

  <div className="header-controls">
    <select
      value={selectedEmployee}
      onChange={(e) => setSelectedEmployee(e.target.value)}
    >
      <option value="">Select Employee</option>
      {teamMembers.map((member, index) => (
        <option key={index} value={member}>
          {member}
        </option>
      ))}
    </select>

   
  </div>
</div>

        <div className="container">

       
<div className="calendar-box-wrapper"><br></br>
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
<div className="form-group">
  <label>Project Type:</label>
  <select
    value={formData.projectType}
    onChange={(e) => setFormData({ ...formData, projectType: e.target.value, projectName: '', phase: '', task: '' })}
  >
    <option value="">Select</option>
    {[...new Set(projectData.map(p => p.projectType))].map((type) => (
      <option key={type} value={type}>{type}</option>
    ))}
  </select>
</div>

<div className="form-group">
  <label>Project Name:</label>
  <select
    value={formData.projectName}
    onChange={(e) => setFormData({ ...formData, projectName: e.target.value, phase: '', task: '' })}
  >
    <option value="">Select</option>
    {projectData
      .filter(p => p.projectType === formData.projectType)
      .map((p) => (
        <option key={p.projectName} value={p.projectName}>{p.projectName}</option>
      ))}
  </select>
</div>

<div className="form-group">
  <label>Phase:</label>
  <select
    value={formData.phase}
    onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
  >
    <option value="">Select</option>
    {selectedProject?.projectPhases?.map((phase) => (
      <option key={phase} value={phase}>{phase}</option>
    ))}
  </select>
</div>

<div className="form-group">
  <label>Task:</label>
  <select
    value={formData.task}
    onChange={(e) => setFormData({ ...formData, task: e.target.value })}
  >
    <option value="">Select</option>
    {selectedProject?.tasks?.map((task) => (
      <option key={task.taskName} value={task.taskName}>{task.taskName}</option>
    ))}
  </select>
</div>

         

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
  <button onClick={handleApproveAll} className="approve-btn" type="button">Approve </button>
  <button onClick={handleAddOrUpdate} className="add-btn" type="button">
    {formData.isEditing ? 'Update' : 'Add'}
  </button>
</div>

        </div>
      )}

     
     
       <style>{`
        * { box-sizing: border-box; }
.entry-item.rejected {
  background: #ffe0e0;
  text-decoration: line-through;
  opacity: 0.6;
}
.form-popup {
  animation: fadeSlideIn 0.3s ease-out forwards;
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@keyframes fadeSlideIn {
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
.calendar-box {
  transition: transform 0.25s ease, background 0.3s ease;
}

.calendar-box:hover {
  transform: scale(1.04);
}
.entry-item {
  animation: fadeInUp 0.4s ease forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.calendar-grid {
  transition: opacity 0.4s ease;
  opacity: 1;
}

.calendar-grid.fade-out {
  opacity: 0;
}

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
          .header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #f7f9fb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: nowrap; /* ✅ prevent wrap on larger screens */
}

.header-title h1 {
  font-size: 22px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  white-space: nowrap;
}

.header-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 0; /* ✅ prevent it from shrinking */
}

.header-controls select {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.toggle-btn {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-btn:hover {
  background-color: #0056b3;
}

/* 📱 Mobile styles */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-controls {
    flex-direction: column;
    width: 100%;
  }

  .header-controls select,
  .header-controls .toggle-btn {
    width: 100%;
  }
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px 20px;
  background-color: #f0f2f5;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.header-left h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-right select {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  min-width: 160px;
}

.toggle-btn {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.toggle-btn:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .header-right {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .header-right select,
  .header-right .toggle-btn {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .header-right {
    width: 100%;
    justify-content: flex-start;
  }

  .header-right select,
  .header-right button {
    width: auto;
  }
}


.controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.controls select {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
}

.toggle-btn {
  padding: 8px 14px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.toggle-btn:hover {
  background-color: #5a6268;
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
          .approve-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 18px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
}

.approve-btn:hover {
  background-color: #0056b3;
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
    </div></div></div></>
  );
}
