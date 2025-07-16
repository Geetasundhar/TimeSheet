import React from 'react';

const TotalProject = () => {
  const projects = [
    { name: 'Website Redesign', status: 'Ongoing', members: 5 },
    { name: 'Mobile App Launch', status: 'Completed', members: 8 },
    { name: 'Marketing Automation', status: 'Ongoing', members: 4 },
    { name: 'Internal Tooling', status: 'Completed', members: 3 },
  ];

  return (
    <div className="container-fluid px-4 py-4">
      <h2 className="fw-bold mb-4">Total Projects</h2>

      <div className="row g-4">
        {projects.map((project, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="project-card p-4">
              <h5 className="fw-semibold mb-2">{project.name}</h5>
              <p className="mb-1"><strong>Status:</strong> {project.status}</p>
              <p className="mb-0"><strong>Members:</strong> {project.members}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .project-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 5px 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .project-card h5 {
          color: #003366;
        }
      `}</style>
    </div>
  );
};

export default TotalProject;
