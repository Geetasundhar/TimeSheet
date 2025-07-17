import React from 'react';

const Department = () => {
  const departments = [
    { name: 'Human Resources', head: 'David Smith', members: 8 },
    { name: 'Engineering', head: 'Lisa White', members: 22 },
    { name: 'Marketing', head: 'Arjun Rao', members: 12 },
    { name: 'Sales', head: 'Priya Menon', members: 15 },
    { name: 'Finance', head: 'Kumar Reddy', members: 6 },
    { name: 'Support', head: 'Ravi Shankar', members: 10 },
  ];

  return (
    <div className="container-fluid px-4 py-4 department-page-bg">
      <h2 className="fw-bold mb-4 department-heading">Departments</h2>

      <div className="row g-4">
        {departments.map((dept, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="dept-card p-4">
              <h5 className="fw-semibold mb-2">{dept.name}</h5>
              <p className="mb-1"><strong>Head:</strong> {dept.head}</p>
              <p className="mb-0"><strong>Members:</strong> {dept.members}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .department-page-bg {
          background: #eaf3fb;
          min-height: 100vh;
        }

        .department-heading {
          background: linear-gradient(to right, #4b86b4, #3a6d99);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.75rem;
        }

        .dept-card {
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #d7e6f2;
          box-shadow: 0 4px 16px rgba(75, 134, 180, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .dept-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 24px rgba(58, 109, 153, 0.2);
        }

        .dept-card h5 {
          color: #3a6d99;
        }

        .dept-card p {
          font-size: 0.95rem;
          color: #444;
        }
      `}</style>
    </div>
  );
};

export default Department;
