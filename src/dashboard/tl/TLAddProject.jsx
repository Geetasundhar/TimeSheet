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
  const [editIndex, setEditIndex] = useState(null); // For tracking which project is being edited

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(stored);
  }, []);

  const resetForm = () => {
    setProjectName('');
    setDescription('');
    setStatus('Ongoing');
    setStartDate('');
    setEndDate('');
    setCompletedDate('');
    setEditIndex(null);
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
      setCompletedDate(''); // reset if status switched back to Ongoing
    }
  }}
>

                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
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
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </form>

            {/* 🔽 List of Projects */}
            <hr />
            <h4 className="mt-4">Added Projects</h4>
            <div className="table-responsive">
              <table className="table table-bordered table-hover mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Completed</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((proj, index) => (
                    <tr key={index}>
                      <td>{proj.projectName}</td>
                      <td>{proj.status}</td>
                      <td>{proj.startDate}</td>
                      <td>{proj.endDate}</td>
                      <td>{proj.completedDate || '-'}</td>
                      <td>{proj.description || '-'}</td>
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
