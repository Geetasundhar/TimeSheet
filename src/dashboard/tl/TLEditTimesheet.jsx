// TimesheetCalendar.jsx
import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegStickyNote } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { Bar, Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import TLsidebar from './TLsidebar';
import TLtopbar from './TLtopbar';
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const times = [
  '7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','9:30 AM',
  '10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM',
  '1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM',
  '4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM'
];
const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const generateInitialData = (rows, cols) =>
  Array.from({ length: rows }, () =>
    Array(cols).fill({
      status: '',
      description: '',
      project: '',
      isProjectStart: false,
      isProjectEnd: false
    })
  );


const calculateWeeklySummary = (data) => {
  const cols = data[0]?.length || 0;
  return Array(cols).fill().map((_, colIdx) => {
    let IN = 0, OUT = 0, LEAVE = 0, ONDUTY = 0;
    for (let r = 0; r < data.length; r++) {
      const s = data[r][colIdx].status;
      if (s === 'IN') IN++;
      else if (s === 'OUT') OUT++;
      else if (s === 'LEAVE') LEAVE++;
      else if (s === 'ONDUTY') ONDUTY++;
    }
    return { IN, OUT, LEAVE, ONDUTY, totalHours: IN * 0.5 };
  });
};
const calculateYearlySummary = (dataMap, year, hourlyRate) => {
  const monthlyData = Array(12).fill().map(() => ({
    projects: {},  // { projectName: totalHours }
    regularHours: 0,
    overtimeHours: 0,
    lateHours: 0,
    totalHours: 0,
    monthlyPay: 0
  }));

  Object.entries(dataMap).forEach(([key, weekData]) => {
    const [yStr, mStr] = key.split('-');
    const y = parseInt(yStr);
    const m = parseInt(mStr) - 1;
    if (y !== year) return;

    const dailyHours = Array(7).fill(0); // for 7 days
    const weekTotals = { totalHours: 0, lateHours: 0 };

    for (let c = 0; c < weekData[0].length; c++) {
      for (let r = 0; r < weekData.length; r++) {
        const cell = weekData[r][c];
        if (!cell) continue;
        const { status, project } = cell;

        if ((status === 'IN' || status === 'OUT') && project) {
          monthlyData[m].projects[project] = (monthlyData[m].projects[project] || 0) + 0.5;
          dailyHours[c] += 0.5;
          weekTotals.totalHours += 0.5;

          // Late hours logic: after 6:00 PM index (18 = 6:00 PM)
          if (status === 'OUT' && r >= 18) {
            weekTotals.lateHours += 0.5;
          }
        }
      }
    }

    monthlyData[m].lateHours += weekTotals.lateHours;
    monthlyData[m].totalHours += weekTotals.totalHours;

    // Regular vs Overtime calculation (weekly basis)
    const regular = Math.min(40, weekTotals.totalHours);
    const overtime = Math.max(0, weekTotals.totalHours - 40);
    monthlyData[m].regularHours += regular;
    monthlyData[m].overtimeHours += overtime;
  });

  monthlyData.forEach(month => {
    month.monthlyPay = month.totalHours * hourlyRate;
  });

  return monthlyData;
};


const aggregateYearlyProjects = (dataMap, year) => {
  const projectTotals = {};
  Object.entries(dataMap).forEach(([key, weekData]) => {
    const [yStr, mStr] = key.split('-');
    const y = parseInt(yStr);
    if (y !== year) return;

    for (let c = 0; c < weekData[0].length; c++) {
      for (let r = 0; r < weekData.length; r++) {
        const cell = weekData[r][c];
        if ((cell.status === 'IN' || cell.status === 'OUT') && cell.project) {
          projectTotals[cell.project] = (projectTotals[cell.project] || 0) + 0.5;
        }
      }
    }
  });
  return projectTotals;
};

export default function TimesheetCalendar() {
    const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ inside component

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [viewMode, setViewMode] = useState('WEEKLY'); 
  const [weeks, setWeeks] = useState([]);
  const [selectedWeekIdx, setSelectedWeekIdx] = useState(null);
  const [dataMap, setDataMap] = useState({});
  const [data, setData] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
const [selectedEmployee, setSelectedEmployee] = useState('');
const [teamMembers, setTeamMembers] = useState([]);

 useEffect(() => {
  if (!selectedEmployee) return;
  const saved = localStorage.getItem(`timesheetDataMap_${selectedEmployee}`);
  if (saved) setDataMap(JSON.parse(saved));
  else setDataMap({});
}, [selectedEmployee]);

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('tl_team_members')) || [];
  setTeamMembers(stored);
  if (stored.length > 0) {
    setSelectedEmployee(stored[0]); // default to first employee
  }
}, []);

  useEffect(() => {
    const days = [];
    const d = new Date(year, month, 1);
    while (d.getMonth() === month) {
      days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    const grouped = [];
    let week = Array(7).fill(null);
    days.forEach(day => {
      week[day.getDay()] = day;
      if (day.getDay() === 6) {
        grouped.push(week);
        week = Array(7).fill(null);
      }
    });
    if (week.some(d => d)) grouped.push(week);
    setWeeks(grouped);
    setSelectedWeekIdx(null);
  }, [month, year]);

  useEffect(() => {
    if (selectedWeekIdx !== null) {
      const key = `${year}-${month + 1}-W${selectedWeekIdx}`;
      const validDays = weeks[selectedWeekIdx].filter(d => d && d.getMonth() === month);
      const cols = validDays.length;
      setData(dataMap[key] || generateInitialData(times.length, cols));
    }
  }, [selectedWeekIdx, dataMap, weeks, month, year]);

  const toggleStatus = (r, c) => {
    const current = data[r][c]?.status;
    const next = current === '' ? 'IN' :
                 current === 'IN' ? 'OUT' :
                 current === 'OUT' ? 'LEAVE' :
                 current === 'LEAVE' ? 'ONDUTY' : '';
    const copy = data.map(row => row.slice());
    copy[r][c] = { ...copy[r][c], status: next };
    setData(copy);
  };

  const updateDesc = (r, c, v) => {
    const copy = data.map(row => row.slice());
    copy[r][c].description = v;
    setData(copy);
  };

  const save = () => {
    const key = `${year}-${month + 1}-W${selectedWeekIdx}`;
    const updated = { ...dataMap, [key]: data };
    setDataMap(updated);
if (!selectedEmployee) return;
localStorage.setItem(`timesheetDataMap_${selectedEmployee}`, JSON.stringify(updatedDataMap));
    toast.success('Saved!');
  };

  const exportToExcel = () => {
    const rows = [];
    Object.entries(dataMap).forEach(([key, weekData]) => {
      const [y, m, wk] = key.split('-');
      for (let c = 0; c < weekData[0].length; c++) {
        for (let r = 0; r < weekData.length; r++) {
          const cell = weekData[r][c];
         rows.push({
  Year: y,
  Month: m,
  Week: wk,
  Time: times[r],
  DayIndex: c + 1,
  Status: cell.status,
  Description: cell.description,
  Project: cell.project,
  IsStart: cell.isProjectStart,
  IsEnd: cell.isProjectEnd
});

        }
      }
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Timesheet');
XLSX.writeFile(wb, `Timesheet_${selectedEmployee}_${year}_${month + 1}.xlsx`);
  };

  const summary = calculateWeeklySummary(data);
  const valid = weeks[selectedWeekIdx]?.filter(d => d && d.getMonth() === month) || [];
  const totalHoursWorked = summary.reduce((sum, s) => sum + s.totalHours, 0);

  const barChartData = {
    labels: valid.map(d => `${weekdays[d.getDay()]} ${d.getDate()}`),
    datasets: [{
      label: 'Worked Hours',
      data: summary.map(s => s.totalHours),
      backgroundColor: 'rgba(54, 162, 235, 0.6)'
    }]
  };
  const pieChartData = {
    labels: ['IN','OUT','LEAVE','ONDUTY'],
    datasets: [{
      data: summary.reduce((acc, s) => {
        acc[0] += s.IN;
        acc[1] += s.OUT;
        acc[2] += s.LEAVE;
        acc[3] += s.ONDUTY;
        return acc;
      }, [0,0,0,0]),
      backgroundColor: ['#28a745','#dc3545','#ffc107','#17a2b8']
    }]
  };

  const monthlySummary = useMemo(() => {
    const ms = Array(7).fill().map(() => ({ IN:0, OUT:0, LEAVE:0, ONDUTY:0, totalHours:0 }));
    Object.keys(dataMap).forEach(key => {
      const [y,m] = key.split('-').map(Number);
      if (viewMode==='MONTHLY' && y===year && m===month+1) {
        const weekData = dataMap[key];
        weekData[0].forEach((_,c) => {
          let IN=0,OUT=0,LEAVE=0,ONDUTY=0;
          weekData.forEach(row => {
            const s = row[c].status;
            if (s==='IN') IN++;
            else if (s==='OUT') OUT++;
            else if (s==='LEAVE') LEAVE++;
            else if (s==='ONDUTY') ONDUTY++;
          });
          const wd = c % 7;
          ms[wd].IN += IN;
          ms[wd].OUT += OUT;
          ms[wd].LEAVE += LEAVE;
          ms[wd].ONDUTY += ONDUTY;
          ms[wd].totalHours += IN * 0.5;
        });
      }
    });
    return ms;
  }, [dataMap, viewMode, month, year]);

  const monthlyBarData = {
    labels: weekdays,
    datasets:[{
      label:'Monthly Worked Hours',
      data: monthlySummary.map(d => d.totalHours),
      backgroundColor:'rgba(75,192,192,0.6)'
    }]
  };
  const monthlyPieData = {
  labels: ['IN', 'OUT', 'LEAVE', 'ONDUTY'],
  datasets: [{
    data: monthlySummary.reduce((acc, d) => {
      acc[0] += d.IN;
      acc[1] += d.OUT;
      acc[2] += d.LEAVE;
      acc[3] += d.ONDUTY;
      return acc;
    }, [0, 0, 0, 0]),
    backgroundColor: ['#28a745', '#dc3545', '#ffc107', '#17a2b8']
  }]
};


  const chartOptions = {
    responsive: true,
    plugins: { legend:{ position:'top' }, title:{ display:true, text:'' } }
  };

  const renderWeekGrid = () => (
    <div className="row mb-3">
      {weeks.map((wk, idx) => {
        const valid = wk.filter(d => d && d.getMonth() === month);
        if (!valid.length) return null;
        const from = valid[0].getDate(), to = valid[valid.length-1].getDate();
        return (
          <div className="col-6 col-md-4 col-lg-3 mb-2" key={idx}>
            <div
              className={`card p-2 text-center ${selectedWeekIdx === idx ? 'bg-primary text-white' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedWeekIdx(idx)}
            >
              <small>{months[month]} {from}–{to}, {year}</small>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderTimesheetTable = () => {
    if (selectedWeekIdx === null) return null;
    if (!valid.length || !data.length || data[0].length !== valid.length) return null;
    return (
      <>
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Time</th>
                {valid.map((d,i)=><th key={i}>{weekdays[d.getDay()]} {d.getDate()}</th>)}
              </tr>
            </thead>
            <tbody>
              {times.map((t,rIdx)=>(
                <tr key={rIdx}>
                  <td>{t}</td>
                  {valid.map((_,cIdx)=>{
                    const cell = data[rIdx][cIdx];
                    const cls = cell.status === 'OUT' ? 'bg-danger text-white' :
                                cell.status === 'LEAVE' ? 'bg-warning' :
                                cell.status === 'ONDUTY' ? 'bg-info text-white' :
                                cell.status === 'IN' ? 'bg-success text-white' : '';
                    return (
                      <td key={cIdx} className={cls} title={cell.description}>
  <div onClick={() => toggleStatus(rIdx, cIdx)} style={{ cursor: 'pointer' }}>
    {cell.status || 'Mark'}

    { cell.isProjectStart && (
      <span className="badge bg-primary ms-1">Start</span>
    )}
    {cell.isProjectEnd && (
      <span className="badge bg-dark ms-1">End</span>
    )}
    {cell.project && (
      <div className="small text-muted mt-1">{cell.project}</div>
    )}
  </div>
<style>
  {`/* ---------- Global Styles ---------- */
body {
  background: linear-gradient(180deg, #e6f0ff 0%, #ffffff 100%);
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.container {
  background-color: #ffffff;
  border-radius: 12px;
  padding:50px;
  box-shadow: 0 10px 30px rgba(0, 123, 255, 0.1);
  animation: fadeSlideIn 0.8s ease;
}

/* ---------- Animations ---------- */
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 0 rgba(0, 123, 255, 0);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 0 rgba(0, 123, 255, 0);
  }
}

@keyframes zoomFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideLeftIn {
  0% {
    transform: translateX(60px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes ripple {
  to {
    box-shadow: 0 0 0 15px rgba(0, 123, 255, 0);
  }
}

/* ---------- Controls ---------- */
select.form-select {
  border: 1px solid #007bff;
  transition: 0.3s ease-in-out;
  animation: zoomFadeIn 0.4s ease;
}
select.form-select:focus {
  border-color: #0056b3;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

/* ---------- Week Cards ---------- */
.card {
  border: 1px solid #d4eaff;
  background-color: #f0f8ff;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  position: relative;
}




.card.bg-primary {
  background-color: #007bff !important;
  color: white;
}

/* ---------- Table ---------- */
.table {
  transition: all 0.2s ease-in-out;
  animation: zoomFadeIn 0.6s ease;
}
.table thead th {
  background-color: #e3f2fd;
  color: #004085;
  font-size: 13px;
  text-transform: uppercase;
}

td {
  transition: all 0.25s ease;
  cursor: pointer;
  position: relative;
  animation: zoomFadeIn 0.3s ease;
}
td:hover {
  background-color: rgba(0, 123, 255, 0.05);
}
td div:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

td.bg-success,
td.bg-danger,
td.bg-warning,
td.bg-info {
  animation: glow 1.5s infinite ease-in-out;
}

/* ---------- Sticky Note Icon ---------- */
svg {
  transition: transform 0.3s ease, color 0.3s ease;
}
svg:hover {
  transform: rotate(10deg) scale(1.3);
  color: #007bff;
}

/* ---------- Buttons ---------- */
button.btn {
  transition: all 0.3s ease-in-out;
  animation: fadeSlideIn 0.8s ease;
}
button.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 123, 255, 0.3);
}
.btn-success {
  animation: glow 2s infinite;
}
.btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
}

/* ---------- Textarea ---------- */
textarea.form-control {
  transition: all 0.2s ease-in-out;
  border-color: #007bff;
  animation: fadeSlideIn 0.5s ease;
}
textarea.form-control:focus {
  border-color: #0056b3;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
}

/* ---------- Chart Headings ---------- */
h5 {
  color: #003e7e;
  margin-bottom: 10px;
  animation: slideLeftIn 0.6s ease;
}

/* ---------- Chart Canvas ---------- */
canvas {
  max-width: 100% !important;
  margin: auto;
  animation: zoomFadeIn 0.6s ease-in-out;
}

/* ---------- Summary Table ---------- */
.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f4faff;
}
.table-dark th {
  background-color: #004085;
  color: #fff;
}

/* ---------- Misc ---------- */
.table-bordered td,
.table-bordered th {
  border: 1px solid #dee2e6;
}
/* TimesheetCalendar.css */
/* TimesheetCalendar.css */
.uniform-summary-card {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
@media (max-width: 991px) {
  .summary-card {
    text-align: center;
  }

  .nav-tabs {
    flex-wrap: wrap;
  }

  .nav-tabs .nav-item {
    flex: 1 0 100%;
    text-align: center;
  }
}
`}
</style>
  <FaRegStickyNote 
    style={{ cursor: 'pointer', marginTop: 4 }}
    onClick={() => setEditingCell([rIdx, cIdx])}
  />
  
  {editingCell?.[0] === rIdx && editingCell?.[1] === cIdx && (
  <>
    <textarea
      className="form-control"
      value={cell.description}
      onChange={(e) => {
        const copy = data.map(row => row.slice());
        copy[rIdx][cIdx].description = e.target.value;
        setData(copy);
      }}
    />

    <div className="d-flex flex-column mt-1">
      <input
        type="text"
        className="form-control mb-1"
        placeholder="Project"
        value={cell.project || ''}
        onChange={(e) => {
          const copy = data.map(row => row.slice());
          copy[rIdx][cIdx].project = e.target.value;
          setData(copy);
        }}
        onBlur={() => setEditingCell(null)}
      />

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={cell.isProjectStart || false}
          onChange={(e) => {
            const copy = data.map(row => row.slice());
            copy[rIdx][cIdx].isProjectStart = e.target.checked;
            setData(copy);
          }}
        />
        <label className="form-check-label">Start</label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={cell.isProjectEnd || false}
          onChange={(e) => {
            const copy = data.map(row => row.slice());
            copy[rIdx][cIdx].isProjectEnd = e.target.checked;
            setData(copy);
          }}
        />
        <label className="form-check-label">End</label>
      </div>
    </div>
  </>
)}

</td>

                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-success mb-4" onClick={save}>Save</button>
      </>
    );
  };

  const renderWeeklySummary = () => {
    if (!summary.length || summary.length !== valid.length) return null;
    return (
      <div className="table-responsive mb-4">
        <div className="card mb-4">
  <div className="card-body">
       <h5 className="card-title">Weekly Summary</h5>
        <table className="table table-striped text-center">
          <thead className="table-dark"><tr>
            <th>Date</th><th>IN</th><th>OUT</th><th>LEAVE</th><th>ONDUTY</th><th>Project</th>
          </tr></thead>
          <tbody>
  {valid.map((day, idx) => {
    const row = summary[idx];
    const projectNames = new Set();
    for (let r = 0; r < data.length; r++) {
      if (data[r][idx]?.project) {
        projectNames.add(data[r][idx].project);
      }
    }
    return (
      <tr key={idx}>
        <td>{`${weekdays[day.getDay()]} ${day.getDate()}`}</td>
        <td>{row.IN}</td>
        <td>{row.OUT}</td>
        <td>{row.LEAVE}</td>
        <td>{row.ONDUTY}</td>
        <td>{Array.from(projectNames).join(', ') || '-'}</td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div> </div>
</div>
    );
  };
  if (!selectedEmployee) return <div className="p-5 text-center">Please select an employee to view the timesheet.</div>;


  return (
     <div className="d-flex" style={{ minHeight: '100vh' }}>
    {/* SIDEBAR */}
<div
  className={`bg-primary text-white transition-all`}
  style={{
    width: sidebarOpen ? '240px' : '0',
    overflow: 'hidden',
    transition: 'width 0.3s',
    minHeight: '100vh'
  }}
>
  {sidebarOpen && <TLsidebar />}
</div>


    {/* MAIN AREA */}
    <div className="flex-grow-1 bg-light">
      {/* TOPBAR */} <div style={{ marginLeft: '0px', padding: '0', flex: 1 }}>
      <div className="bg-white shadow-sm" style={{ height: '70px', zIndex: 1 }}>
<TLtopbar onToggle={() => setSidebarOpen(!sidebarOpen)} />

      </div></div>

      {/* CONTENT */}
      <div className="container-fluid p-4" style={{ marginTop: '20px' }}>
      <h2 className="mb-4">Employee Timesheet</h2>


      <div className="d-flex gap-2 mb-3"><select
  className="form-select w-auto me-2"
  value={selectedEmployee}
  onChange={(e) => setSelectedEmployee(e.target.value)}
>
  {teamMembers.map((name, i) => (
    <option key={i} value={name}>{name}</option>
  ))}
</select>

        <select className="form-select w-auto" value={viewMode} onChange={e=>setViewMode(e.target.value)}>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
        <select className="form-select w-auto" value={month} onChange={e=>setMonth(Number(e.target.value))}>
          {months.map((m,i)=><option key={i} value={i}>{m}</option>)}
        </select>
        <select className="form-select w-auto" value={year} onChange={e=>setYear(Number(e.target.value))}>
          {Array.from({length:10},(_,i)=>today.getFullYear()-5+i)
            .map(y=><option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {viewMode==='WEEKLY' && <>
        {renderWeekGrid()}
        {renderTimesheetTable()}
        {renderWeeklySummary()}
        {selectedWeekIdx!==null && <>
<div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title">Bar Chart: Worked Hours</h5>
    <Bar data={barChartData} options={chartOptions} />
  </div>
</div>
<div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title">Pie Chart: Status Breakdown</h5>
  <div style={{ maxWidth: '300px', margin: 'auto', animation:'none' }}>
  <Pie data={pieChartData} />
</div>
  </div>
</div>
<div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title">Total Hours This Week</h5>
    <p className="card-text"><strong>{totalHoursWorked.toFixed(1)} hrs</strong></p>
  </div>
</div>
        </>}
      </>}

      {viewMode==='MONTHLY' && <>
  <div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title">
    Monthly Summary: {months[month]} {year}</h5>
    <table className="table table-bordered text-center">
      <thead className="table-dark">
        <tr>
          <th>Day</th><th>IN</th><th>OUT</th><th>LEAVE</th><th>ONDUTY</th><th>Total</th>
        </tr>
      </thead>
      <tbody>
        {weekdays.map((d,i)=><tr key={i}>
          <td>{d}</td><td>{monthlySummary[i].IN}</td><td>{monthlySummary[i].OUT}</td>
          <td>{monthlySummary[i].LEAVE}</td><td>{monthlySummary[i].ONDUTY}</td>
          <td>{monthlySummary[i].totalHours.toFixed(1)}</td>
        </tr>)}
      </tbody>
    </table>
     </div>
  </div>

 <div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title">Monthly Worked Hours Chart</h5>
    <Bar data={monthlyBarData} options={chartOptions} />
  </div>
</div>

 <div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title">Monthly Status Breakdown</h5>
    <Pie data={monthlyPieData} />
  </div>
  </div>

 <div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title">Total Hours This Month</h5>
    <p className="card-text"><strong>{monthlySummary.reduce((sum, d) => sum + d.totalHours, 0).toFixed(1)} hrs</strong></p>
  </div>
</div>

</>}


{viewMode === 'YEARLY' && (
  <div className="mb-4">
    <h5>Yearly Summary: {year}</h5>

    {/* Project Hours Summary */}
    <div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title">Projects Handled</h5>
    <table className="table table-bordered text-center">
      <thead className="table-secondary">
        <tr>
          <th>Project Name</th>
          <th>Total Hours Worked</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(aggregateYearlyProjects(dataMap, year)).map(([project, hours]) => (
          <tr key={project}>
            <td>{project}</td>
            <td>{hours.toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
 </div>
</div>
    {/* Monthly Breakdown */}
   <div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title">Monthly Breakdown</h5>
    <table className="table table-bordered text-center">
      <thead className="table-dark">
        <tr>
          <th>Month</th>
          <th>Regular Hours</th>
          <th>Overtime Hours</th>
          <th>Late Hours</th>
          <th>Total Hours</th>
          <th>Monthly Pay</th>
        </tr>
      </thead>
      <tbody>
        {calculateYearlySummary(dataMap, year, 48).map((row, idx) => (
          <tr key={idx}>
            <td>{months[idx]}</td>
            <td>{row.regularHours.toFixed(1)}</td>
            <td>{row.overtimeHours.toFixed(1)}</td>
            <td>{row.lateHours.toFixed(1)}</td>
            <td>{row.totalHours.toFixed(1)}</td>
            <td>${row.monthlyPay.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
</div>
</div>
    {/* Total Summary */}
    {(() => {
      const summary = calculateYearlySummary(dataMap, year, 48);
      const totals = summary.reduce((acc, m) => {
        acc.regular += m.regularHours;
        acc.overtime += m.overtimeHours;
        acc.late += m.lateHours;
        acc.total += m.totalHours;
        acc.pay += m.monthlyPay;
        return acc;
      }, { regular:0, overtime:0, late:0, total:0, pay:0 });

      return (
        <>
<div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title">Yearly Analytics</h5>
          <ul className="list-group">
            <li className="list-group-item">Total Regular Hours: <strong>{totals.regular.toFixed(1)} hrs</strong></li>
            <li className="list-group-item">Total Overtime Hours: <strong>{totals.overtime.toFixed(1)} hrs</strong></li>
            <li className="list-group-item">Total Late Hours: <strong>{totals.late.toFixed(1)} hrs</strong></li>
            <li className="list-group-item">Total Hours Worked: <strong>{totals.total.toFixed(1)} hrs</strong></li>
            <li className="list-group-item">Yearly Income: <strong>${totals.pay.toFixed(2)}</strong></li>
          </ul></div>
</div>
        </>
      );
    })()}<div className="card mb-4">
  <div className="card-body">
    <h5 className="card-title">Yearly Work Distribution</h5>
  <Bar
    data={{
      labels: months,
      datasets: [{
        label: 'Total Hours Worked',
        data: calculateYearlySummary(dataMap, year, 48).map(m => m.totalHours),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }]
    }}
    options={{
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Monthly Total Hours' }
      }
    }}
  />
</div>
  </div>

  </div>
  
)}



      <div className="card mb-4">
  <div className="card-body text-center">
    <button className="btn btn-outline-primary" onClick={exportToExcel}>Export to Excel</button>
  </div>
</div>
</div>
</div></div>
  );
}
