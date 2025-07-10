import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="fs-3">Oops! Page not found</p>
        <p className="lead">
          The page you’re looking for doesn’t exist.
        </p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
