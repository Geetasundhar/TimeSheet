import React from 'react';

const TotalProject = () => {
  const projects = [
    { name: 'Website Redesign', status: 'Ongoing', members: 5 },
    { name: 'Mobile App Launch', status: 'Completed', members: 8 },
    { name: 'Marketing Automation', status: 'Ongoing', members: 4 },
    { name: 'Internal Tooling', status: 'Completed', members: 3 },
  ];

  return (
    <div className="container-fluid px-4 py-4 project-page-bg">
      <h2 className="fw-bold mb-4 project-heading">Total Projects</h2>

      <div className="row g-4">
        {projects.map((project, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="project-card p-4">
              <h5 className="fw-semibold mb-2">{project.name}</h5>
              <p className="mb-1">
                <strong>Status:</strong>{' '}
                <span className={project.status === 'Completed' ? 'text-success' : 'text-warning'}>
                  {project.status}
                </span>
              </p>
              <p className="mb-0">
                <strong>Members:</strong> {project.members}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .project-page-bg {
          background: #eaf3fb;
          min-height: 100vh;
        }

        .project-heading {
          background: linear-gradient(90deg, #4b86b4, #3a6d99);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.75rem;
        }

        .project-card {
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 4px 18px rgba(75, 134, 180, 0.15);
          border: 1px solid #d7e6f2;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 24px rgba(58, 109, 153, 0.25);
        }

        .project-card h5 {
          color: #3a6d99;
        }
      `}</style>
    </div>
  );
};

export default TotalProject;
