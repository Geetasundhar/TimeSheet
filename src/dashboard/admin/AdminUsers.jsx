import React from 'react';

const AdminUsers = ({ users = [] }) => {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0">Created Users</h5>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge bg-${user.role === 'hr' ? 'primary' : user.role === 'tl' ? 'warning' : 'dark'}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    No users added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
