import React from 'react';

const BillableHours = () => {
  const billables = [
    { employee: 'Anu Thomas', hours: 40, project: 'App Launch' },
    { employee: 'Ravi Verma', hours: 35, project: 'Website Redesign' },
    { employee: 'Meera Nair', hours: 38, project: 'Marketing Automation' },
    { employee: 'Karan J', hours: 42, project: 'Internal Tools' },
  ];

  return (
    <div className="container-fluid px-4 py-4">
      <h2 className="fw-bold mb-4">Billable Hours</h2>

      <div className="row g-4">
        {billables.map((entry, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="billable-card p-4">
              <h5 className="fw-semibold mb-2">{entry.employee}</h5>
              <p className="mb-1"><strong>Project:</strong> {entry.project}</p>
              <p className="mb-0"><strong>Hours:</strong> {entry.hours}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .billable-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
        }

        .billable-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .billable-card h5 {
          color: #003366;
        }
      `}</style>
    </div>
  );
};

export default BillableHours;
