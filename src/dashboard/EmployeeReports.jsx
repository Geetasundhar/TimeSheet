import React, { useState, useEffect, useMemo } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
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
import * as XLSX from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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

const ReadOnlyTimesheet = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [weeks, setWeeks] = useState([]);
  const [selectedWeekIdx, setSelectedWeekIdx] = useState(null);
  const [dataMap, setDataMap] = useState({});
  const [data, setData] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });

  const employeeId = localStorage.getItem('employeeId');
  const employeeName = localStorage.getItem('employeeName');
  const employeePhoto = localStorage.getItem('employeePhoto');

  useEffect(() => {
    if (employeeId) {
      fetch(`http://localhost:5000/api/employees/${employeeId}`)
        .then(res => res.json())
        .then(data => {
          setProjectName(data.project || 'N/A');
          setEditForm({ name: data.name, email: data.email });
        })
        .catch(err => {
          console.error('Failed to fetch project:', err);
          setProjectName('N/A');
        });
    }
  }, [employeeId]);

  useEffect(() => {
    const saved = localStorage.getItem(`timesheetDataMap_${employeeId}`);
    setDataMap(saved ? JSON.parse(saved) : {});
  }, [employeeId]);

  useEffect(() => {
    const d = new Date(year, month, 1);
    const days = [];
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

    const firstValidWeekIdx = grouped.findIndex(wk => wk.some(d => d && d.getMonth() === month));
    setSelectedWeekIdx(firstValidWeekIdx !== -1 ? firstValidWeekIdx : null);
  }, [month, year]);

  useEffect(() => {
    if (selectedWeekIdx !== null && weeks[selectedWeekIdx]) {
      const key = `${year}-${month + 1}-W${selectedWeekIdx}`;
      const validDays = weeks[selectedWeekIdx].filter(d => d && d.getMonth() === month);
      const cols = validDays.length > 0 ? validDays.length : 7;
      setData(dataMap[key] || generateInitialData(times.length, cols));
    }
  }, [selectedWeekIdx, dataMap, weeks, month, year]);

  const summary = useMemo(() => {
    const cols = data[0]?.length || 0;
    return Array(cols).fill().map((_, c) => {
      let IN = 0, OUT = 0, LEAVE = 0, ONDUTY = 0;
      for (let r = 0; r < data.length; r++) {
        const s = data[r]?.[c]?.status;
        if (s === 'IN') IN++;
        else if (s === 'OUT') OUT++;
        else if (s === 'LEAVE') LEAVE++;
        else if (s === 'ONDUTY') ONDUTY++;
      }
      return { IN, OUT, LEAVE, ONDUTY, totalHours: IN * 0.5 };
    });
  }, [data]);

  const valid = weeks[selectedWeekIdx]?.filter(d => d && d.getMonth() === month) || [];

  const barChartData = {
    labels: valid.map(d => `${weekdays[d.getDay()]} ${d.getDate()}`),
    datasets: [{
      label: 'Worked Hours',
      data: summary.map(s => s.totalHours),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }],
  };

  const pieChartData = {
    labels: ['IN', 'OUT', 'LEAVE', 'ONDUTY'],
    datasets: [{
      data: summary.reduce((acc, s) => {
        acc[0] += s.IN;
        acc[1] += s.OUT;
        acc[2] += s.LEAVE;
        acc[3] += s.ONDUTY;
        return acc;
      }, [0, 0, 0, 0]),
      backgroundColor: ['#28a745', '#dc3545', '#ffc107', '#17a2b8'],
    }],
  };

  const exportToExcel = () => {
    const validDays = weeks[selectedWeekIdx]?.filter(d => d && d.getMonth() === month) || [];
    const sheetData = [];
    const headerRow = ['Time', ...validDays.map(d => `${weekdays[d.getDay()]} ${d.getDate()}`)];
    sheetData.push(headerRow);
    times.forEach((timeSlot, rIdx) => {
      const row = [timeSlot];
      validDays.forEach((_, cIdx) => {
        const cell = data[rIdx]?.[cIdx];
        row.push(cell?.status || '');
      });
      sheetData.push(row);
    });
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timesheet');
    XLSX.writeFile(workbook, 'Timesheet.xlsx');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {sidebarOpen && (
        <div className="bg-primary text-white p-3 d-flex flex-column justify-content-between" style={{ width: '250px', height: '100vh', position: 'fixed' }}>
          <div>
            <div className="d-flex align-items-center mb-4">
              <img src={employeePhoto || 'https://cdn-icons-png.flaticon.com/512/194/194938.png'} alt="Profile" className="rounded-circle me-2" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              <div>
                <p className="mb-0 fw-bold">{employeeName || 'Employee'}</p>
                <p className="mb-0 text-white-50" style={{ fontSize: '13px' }}>{employeeId || 'ID not available'}</p>
              </div>
            </div>
            <a href="/" className="text-white text-decoration-none d-block mb-2"><i className="bi bi-house me-2"></i>Home</a>
            <a href="/dashboard/Employee" className="text-white text-decoration-none d-block mb-2"><i className="bi bi-speedometer me-2"></i>Dashboard</a>
            <a href="/employee/reports" className="text-decoration-none d-block bg-white text-primary rounded p-2 fw-bold"><i className="bi bi-file-earmark-bar-graph me-2"></i>Reports</a>
          </div>
          <div>
            <a href="/" className="text-white text-decoration-none d-block mt-3"><i className="bi bi-box-arrow-right me-2"></i>Logout</a>
          </div>
        </div>
      )}

      {/* Topbar */}
      <div className="flex-grow-1" style={{ marginLeft: sidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s' }}>
        <div className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white sticky-top">
          <button className="btn btn-outline-primary" onClick={() => setSidebarOpen(!sidebarOpen)}><i className="bi bi-list"></i></button>
          <div className="dropdown">
            <img src='https://cdn-icons-png.flaticon.com/512/194/194938.png' className="rounded-circle dropdown-toggle" role="button" data-bs-toggle="dropdown" style={{ width: '40px', height: '40px', cursor: 'pointer' }} alt="user" />
            <ul className="dropdown-menu dropdown-menu-end">
              <li><button className="dropdown-item" onClick={() => setShowEditModal(true)}>Edit Profile</button></li>
              <li><a className="dropdown-item text-danger" href="/">Logout</a></li>
            </ul>
          </div>
        </div>

        <div className="container-fluid p-4">
          <h2 className="mb-4">Efficiency Sheet</h2>

          {/* Month/Year Selection */}
          <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
            <select className="form-select w-auto" value={month} onChange={e => setMonth(Number(e.target.value))}>
              {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
            </select>
            <select className="form-select w-auto" value={year} onChange={e => setYear(Number(e.target.value))}>
              {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <div className="form-control w-auto border-0 bg-light">
              <strong>Project:</strong> {projectName}
            </div>
          </div>

          {/* Week Selection */}
          <div className="row mb-3">
            {weeks.map((wk, idx) => {
              const valid = wk.filter(d => d && d.getMonth() === month);
              if (!valid.length) return null;
              const from = valid[0].getDate(), to = valid[valid.length - 1].getDate();
              return (
                <div className="col-6 col-md-3 mb-2" key={idx}>
                  <div className={`card p-2 text-center ${selectedWeekIdx === idx ? 'bg-primary text-white' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setSelectedWeekIdx(idx)}>
                    <small>{months[month]} {from}–{to}, {year}</small>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timesheet Table */}
          {selectedWeekIdx !== null && data.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table table-bordered text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Time</th>
                      {valid.map((d, i) => <th key={i}>{weekdays[d.getDay()]} {d.getDate()}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {times.map((t, rIdx) => (
                      <tr key={rIdx}>
                        <td>{t}</td>
                        {valid.map((_, cIdx) => {
                          const cell = data[rIdx]?.[cIdx] || {};
                          const bg = cell.status === 'IN' ? 'bg-success text-white' : cell.status === 'OUT' ? 'bg-danger text-white' : cell.status === 'LEAVE' ? 'bg-warning' : cell.status === 'ONDUTY' ? 'bg-info text-white' : '';
                          return (
                            <td key={cIdx} className={bg} title={cell.description || ''}>
                              {cell.status || '-'}
                              {cell.project && <div className="small text-muted">{cell.project}</div>}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-end">
                <button className="btn btn-success" onClick={exportToExcel}>⬇️ Export to Excel</button>
              </div>

              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">Bar Chart: Worked Hours</h5>
                  <Bar data={barChartData} />
                </div>
              </div>

              
            </>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Name</label>
          <input type="text" className="form-control mb-3" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
          <label>Email</label>
          <input type="email" className="form-control" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={() => {
            alert('Profile updated!');
            setShowEditModal(false);
          }}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReadOnlyTimesheet;
