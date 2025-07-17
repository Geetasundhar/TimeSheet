import React, { useState, useEffect } from 'react';
import TLsidebar from '../../dashboard/tl/TLsidebar';
import { Button, Form, Modal } from 'react-bootstrap';
import TLtopbar from './TLtopbar';

const TLAddMembers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tl_team_members')) || [];
    setTeamMembers(stored);
  }, []);
<style>{`
  @media (max-width: 767px) {
    .list-group-item {
      flex-direction: column;
      align-items: flex-start !important;
    }
    .list-group-item button {
      width: 100%;
    }
  }
`}</style>

  const addMember = () => {
    if (newMember.trim() !== '') {
      const updated = [...teamMembers, newMember.trim()];
      setTeamMembers(updated);
      localStorage.setItem('tl_team_members', JSON.stringify(updated));
      setNewMember('');
      setShowModal(false);
    }
  };

  const removeMember = (name) => {
    const updated = teamMembers.filter((member) => member !== name);
    setTeamMembers(updated);
    localStorage.setItem('tl_team_members', JSON.stringify(updated));
  };

  return (
    <div style={{ display: 'flex' }}>
<div
        className={`bg-primary text-white transition-all`}
        style={{
          width: sidebarOpen ? '240px' : '0',
          overflow: 'hidden',
          transition: 'width 0.3s',
          minHeight: '100vh',
        }}
>
  {sidebarOpen && <TLsidebar />}
</div>      
<div style={{ marginLeft: '40px', padding: '2rem', flex: 1 }}>  <div className="bg-white shadow-sm" style={{ height: '70px', zIndex: 1 }}>
<TLtopbar onToggle={() => setSidebarOpen(!sidebarOpen)} />

      </div>
<br></br>
        <h2 className="mb-4">Add Project Members</h2>

        <Button variant="success" onClick={() => setShowModal(true)}>
          Add New Member
        </Button>

        <ul className="list-group mt-4">
          {teamMembers.map((member, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {member}
              <button className="btn btn-sm btn-danger" onClick={() => removeMember(member)}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Team Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Member Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter member name"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={addMember}>
                Add Member
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default TLAddMembers;
