import React, { useState, useEffect } from 'react';
import TLsidebar from '../../dashboard/tl/TLsidebar';
import { Button, Form, Modal } from 'react-bootstrap';
import TLtopbar from './TLtopbar';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaTrash } from 'react-icons/fa';


const TLAddMembers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tl_team_members')) || [];
    setTeamMembers(stored);
  }, []);

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

      <div style={{ flex: 1 }}>
        <div className="bg-white shadow-sm" style={{ height: '70px', zIndex: 1 }}>
          <TLtopbar onToggle={() => setSidebarOpen(!sidebarOpen)} />
        </div><style>{`/* Fade-in container animation */
.fade-in {
  animation: fadeInUp 0.6s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animated list items */
.animated-list {
  animation: listFade 0.4s ease both;
}

@keyframes listFade {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Stylish heading */
.stylish-heading {
  font-weight: 600;
  color: #2c3e50;
}

/* Add button */
.add-btn {
  background: linear-gradient(135deg, #20bf6b, #0fb9b1);
  color: white;
  transition: all 0.3s ease;
  border: none;
}
.add-btn:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, #11998e, #38ef7d);
}

/* List item styling */
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
}
.list-item:hover {
  background-color: #f1f1f1;
}

/* Modal glass effect */
.glass-modal .modal-content {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 15px;
  animation: scaleFade 0.4s ease;
}

@keyframes scaleFade {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header-custom {
  border-bottom: none;
}

/* Floating label effect */
.floating-label {
  position: relative;
}
.floating-label input:focus ~ label,
.floating-label input:not(:placeholder-shown) ~ label {
  transform: translateY(-22px) scale(0.85);
  color: #007bff;
}
.floating-label label {
  position: absolute;
  left: 12px;
  top: 10px;
  transition: 0.2s ease all;
  background-color: white;
  padding: 0 4px;
  pointer-events: none;
}

/* Submit button */
.submit-btn {
  background-color: #007bff;
  border: none;
  transition: all 0.3s ease;
}
.submit-btn:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}
  .btn-success {
  transition: background-color 0.3s ease;
}
.btn-success:hover {
  background-color: #28a745;
}

.list-group-item {
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}
.stylish-heading {
  font-weight: 600;
  color: #2c3e50;
}

.member-card {
  transition: box-shadow 0.3s ease;
  border-radius: 16px;
}
.member-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}
  .member-card-wrapper {
  width: 280px; /* Compact width */
}

.member-card {
  border-radius: 16px;
  transition: box-shadow 0.3s ease;
}

.member-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}


`}</style>

        <div className="container-fluid p-4 fade-in" style={{ marginTop: '20px' }}>
          <h2 className="mb-4 stylish-heading">Add Project Members</h2>

          <Button className="add-btn mb-3" onClick={() => setShowModal(true)}>
            + Add New Member
          </Button>

          
                <div className="d-flex flex-wrap justify-content-center gap-3">
  <AnimatePresence>
    {teamMembers.map((member, index) => (
      <motion.div
        key={member}
        className="member-card-wrapper"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <div className="card shadow member-card">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaUser className="text-primary me-2" size={20} />
              <span>{member}</span>
            </div>
            <motion.button
              className="btn btn-sm btn-outline-danger rounded-circle"
              onClick={() => removeMember(member)}
              whileHover={{ scale: 1.2 }}
              title="Remove"
            >
              <FaTrash />
            </motion.button>
          </div>
        </div>
      </motion.div>
    ))}
  </AnimatePresence>
</div>


             

          {/* Modal */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            className="glass-modal"
            centered
          >
            <Modal.Header closeButton className="modal-header-custom">
              <Modal.Title>Add Team Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="animated-form">
                <Form.Group className="mb-3 floating-label">
                  <Form.Control
                    type="text"
                    placeholder=" "
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                  />
                  <Form.Label>Member Name</Form.Label>
                </Form.Group>
                <Button className="submit-btn w-100" onClick={addMember}>
                  Add Member
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TLAddMembers;
