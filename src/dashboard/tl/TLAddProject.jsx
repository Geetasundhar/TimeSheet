import React, { useState, useEffect } from 'react';
import TLsidebar from './TLsidebar';
import TLtopbar from './TLtopbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TLAddProject = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Ongoing');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [completedDate, setCompletedDate] = useState('');
  const [projects, setProjects] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(storedProjects);

    const storedTeam = JSON.parse(localStorage.getItem('tl_team_members')) || [];
    setTeamMembers(storedTeam);
  }, []);

  const resetForm = () => {
    setProjectName('');
    setDescription('');
    setStatus('Ongoing');
    setStartDate('');
    setEndDate('');
    setCompletedDate('');
    setEditIndex(null);
    setSelectedMembers([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectName || !startDate || !endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newProject = {
      projectName,
      description,
      status,
      startDate,
      endDate,
      completedDate: completedDate || '',
      assignedMembers: selectedMembers,
    };

    let updatedProjects;

    if (editIndex !== null) {
      updatedProjects = [...projects];
      updatedProjects[editIndex] = newProject;
      toast.success('Project updated successfully!');
    } else {
      updatedProjects = [...projects, newProject];
      toast.success('Project added successfully!');
    }

    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    resetForm();
  };

  const handleEdit = (index) => {
    const proj = projects[index];
    setProjectName(proj.projectName);
    setDescription(proj.description || '');
    setStatus(proj.status);
    setStartDate(proj.startDate);
    setEndDate(proj.endDate);
    setCompletedDate(proj.completedDate || '');
    setEditIndex(index);
    setSelectedMembers(proj.assignedMembers || []);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          className="bg-primary text-white"
          style={{
            width: sidebarOpen ? '240px' : '0',
            overflow: 'hidden',
            transition: 'width 0.3s',
            minHeight: '100vh',
          }}
        >
          {sidebarOpen && <TLsidebar />}
        </div>

        <div style={{ flex: 1 }}>
          <div className="bg-white shadow-sm" style={{ height: '70px', zIndex: 1 }}>
            <TLtopbar onToggle={() => setSidebarOpen(!sidebarOpen)} />
          </div>
          <style>{`/* TLAddProject.css */

input.form-control,
textarea.form-control,
select.form-control {
  width: 60%; /* shorter width */
  transition: box-shadow 0.3s, transform 0.3s;
}
/* Fade-in animation */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Form Container */
.form-container {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 30px;
  margin-top: 30px;
  transition: all 0.3s ease-in-out;
}

/* Input and select styles */
input[type="text"],
input[type="date"],
select,
textarea {
  border-radius: 12px !important;
  border: 1px solid #ced4da;
  transition: all 0.3s ease;
  padding: 10px 14px;
  font-size: 0.95rem;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
  outline: none;
}

/* Label styling */
label.form-label {
  font-weight: 500;
  margin-bottom: 6px;
}

/* Button styling */
button.btn-primary {
  background: linear-gradient(to right, #4facfe, #00f2fe);
  border: none;
  border-radius: 50px;
  padding: 10px 24px;
  font-weight: bold;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
}

button.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 123, 255, 0.4);
}

button.btn-secondary {
  border-radius: 50px;
  padding: 10px 24px;
}

/* Table enhancements */
.table-container {
  margin-top: 30px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
}

table.table {
  border-collapse: separate;
  border-spacing: 0 10px;
}

table.table thead th {
  background: #f8f9fa;
  font-weight: 600;
}

table.table tbody tr {
  background-color: #fff;
  transition: transform 0.2s ease;
}

table.table tbody tr:hover {
  transform: scale(1.01);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}
.zoom-in {
  animation: zoomIn 0.4s ease;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
  .stagger-animation {
  opacity: 0;
  transform: translateY(20px);
  animation: slideFadeIn 0.5s ease forwards;
}

@keyframes slideFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.6);
  transform: scale(1.02);
}

button.btn {
  transition: all 0.3s ease;
}

button.btn:hover {
  transform: scale(1.05);
}

table.table tbody tr {
  transition: background-color 0.3s ease, transform 0.3s;
}

table.table tbody tr:hover {
  background-color: #f9f9f9;
  transform: scale(1.01);
}
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

input, select, textarea {
  transition: all 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  border-color: #007bff;
}

button {
  transition: transform 0.2s ease;
}

button:hover {
  transform: scale(1.05);
}
`}</style>

          <div className="container-fluid p-4" style={{ marginTop: '20px' }}>
            <h2 className="mb-4">{editIndex !== null ? 'Edit Project' : 'Add Project'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Project Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status *</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => {
                    const selectedStatus = e.target.value;
                    setStatus(selectedStatus);

                    if (selectedStatus === 'Completed' && !completedDate) {
                      const today = new Date().toISOString().split('T')[0];
                      setCompletedDate(today);
                    }
                    if (selectedStatus !== 'Completed') {
                      setCompletedDate('');
                    }
                  }}
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Assign Team Members</label>
                <select
                  className="form-control"
                  multiple
                  value={selectedMembers}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, (option) => option.value);
                    setSelectedMembers(options);
                  }}
                >
                  {teamMembers.map((member, idx) => (
                    <option key={idx} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
                <small className="text-muted">Hold Ctrl (or Cmd) to select multiple</small>
              </div>

              <div className="mb-3">
                <label className="form-label">Start Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">End Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Completed Date (Optional)</label>
                <input
                  type="date"
                  className="form-control"
                  value={completedDate}
                  onChange={(e) => setCompletedDate(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {editIndex !== null ? 'Update Project' : 'Add Project'}
              </button>

              {editIndex !== null && (
                <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </form>

            {/* 🔽 List of Projects */}
            <hr />
            <h4 className="mt-4">Added Projects</h4>
<div className="table-responsive fade-in">
              <table className="table table-bordered table-hover mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Completed</th>
                    <th>Description</th>
                    <th>Members</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((proj, index) => (
                    <tr className="stagger-animation"
    style={{ animationDelay: `${index * 0.1}s` }}
    key={index}>
                      <td>{proj.projectName}</td>
                      <td>{proj.status}</td>
                      <td>{proj.startDate}</td>
                      <td>{proj.endDate}</td>
                      <td>{proj.completedDate || '-'}</td>
                      <td>{proj.description || '-'}</td>
                      <td>
                        {proj.assignedMembers && proj.assignedMembers.length > 0
                          ? proj.assignedMembers.join(', ')
                          : '-'}
                      </td>
                      <td>
                        {proj.status !== 'Completed' && (
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default TLAddProject;
