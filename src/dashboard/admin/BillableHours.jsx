import React from 'react';

const BillableHours = () => {
  const billables = [
    { employee: 'Anu Thomas', hours: 40, project: 'App Launch' },
    { employee: 'Ravi Verma', hours: 35, project: 'Website Redesign' },
    { employee: 'Meera Nair', hours: 38, project: 'Marketing Automation' },
    { employee: 'Karan J', hours: 42, project: 'Internal Tools' },
  ];

  return (
    <div className="container-fluid px-4 py-4 billable-page-bg">
      <h2 className="fw-bold mb-4 billable-heading">Billable Hours</h2>

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
        .billable-page-bg {
          background: #eaf3fb;
          min-height: 100vh;
        }

        .billable-heading {
          background: linear-gradient(90deg, #4b86b4, #3a6d99);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.75rem;
        }

        .billable-card {
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #d7e6f2;
          box-shadow: 0 4px 16px rgba(75, 134, 180, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .billable-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 24px rgba(58, 109, 153, 0.2);
        }

        .billable-card h5 {
          color: #3a6d99;
        }
      `}</style>
    </div>
  );
};

export default BillableHours;
