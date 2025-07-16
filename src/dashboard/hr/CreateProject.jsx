import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './CreateProject.css';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send this data to backend API here
    alert(`Project Created: ${projectName}`);
  };

  return (
    <div className="create-project-container">
      <h3 className="mb-4">Create New Project</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Project
        </Button>
      </Form>
    </div>
  );
};

export default CreateProject;
