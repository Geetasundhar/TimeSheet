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
    <div className="container-fluid px-4 py-4">
      <h2 className="fw-bold mb-4">Departments</h2>

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

      {/* Inline Styles */}
      <style>{`
        .dept-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
        }

        .dept-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .dept-card h5 {
          color: #003366;
        }

        .dept-card p {
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

export default Department;
