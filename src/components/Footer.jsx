import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="text-white position-relative m-0"
      style={{
        backgroundColor: "#09437dff",
        width: "100vw",
        overflowX: "hidden",
        fontFamily: "Segoe UI",
        paddingTop: "40px",
        paddingBottom: "20px",
      }}
    >
      <div className="container-fluid px-4 position-relative z-1">
        <div className="row justify-content-around text-center">
          {/* Features */}
          <div className="col-md-4 section-box mb-4">
            <h5 className="border-bottom pb-2">Features</h5>
            <ul className="list-unstyled small">
              <li>Timesheet Entry</li>
              <li>Progress Dashboard</li>
              <li>Role-based Access</li>
              <li>Team Tracking</li>
              <li>HR Analytics</li>
              <li>Shift Management</li>
              <li>Performance Management</li>
            </ul>
          </div>

          {/* Queries + Collaborations and Knowledge Base */}
          <div className="col-md-8 mb-4">
            <div className="row">
              {/* Queries + Collaborations */}
              <div className="col-md-6 section-box mb-4">
                <h5 className="border-bottom pb-2">Queries</h5>
                <ul className="list-unstyled small">
                  <li>FAQ</li>
                  <li>
                    <a href="#" className="text-white text-decoration-none link-hover">Feedback</a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none link-hover">Complaints</a>
                  </li><br></br>
                </ul>

                <h5 className="border-bottom pb-2 mt-4">Collaborations With</h5>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center justify-content-center gap-2 mb-2">
                    <img src="https://tansam.org/assets/mainpageimage/tansamlogo.png" alt="TANSAM" width="40" /> TANSAM
                  </li>
                  <li className="d-flex align-items-center justify-content-center gap-2 mb-2">
                    <img src="https://toppng.com/uploads/preview/siemens-vector-logo-11574231117ssrjafey4i.png" alt="Siemens" width="60" /> Siemens
                  </li>
                  <li className="d-flex align-items-center justify-content-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/TIDCO_logo_2024.svg/1200px-TIDCO_logo_2024.svg.png" alt="TICDCO" width="40" /> TICDCO
                  </li>
                </ul>
              </div>

              {/* Quick Links + Knowledge Base */}
              <div className="col-md-6 section-box mb-4">
                <h5 className="border-bottom pb-2">Quick Links</h5>
                <ul className="list-unstyled small">
                  <li><a href="#" className="text-white text-decoration-none link-hover">Home</a></li>
                  <li><a href="#" className="text-white text-decoration-none link-hover">About Us</a></li>
                  <li><a href="#" className="text-white text-decoration-none link-hover">Contact</a></li>
                  <li><a href="https://tansam.org" className="text-white text-decoration-none link-hover">TANSAM website</a></li>
                </ul>

                <h5 className="border-bottom pb-2 mt-4">Knowledge Base</h5>
                <ul className="list-unstyled small">
                  <li><a href="#" className="text-white text-decoration-none link-hover">How to Submit Timesheet</a></li>
                  <li><a href="#" className="text-white text-decoration-none link-hover">Understanding Roles</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-top pt-3 mt-4">
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
            <span>Email: support@timemgmt.com</span>
            <div className="d-flex gap-3">
              <a href="#" className="text-white icon-hover"><FaInstagram /></a>
              <a href="#" className="text-white icon-hover"><FaFacebookF /></a>
              <a href="#" className="text-white icon-hover"><FaLinkedinIn /></a>
              <a href="#" className="text-white icon-hover"><FaTwitter /></a>
            </div>
          </div>
          <p className="small mt-3 text-secondary">
            © {new Date().getFullYear()} Time Management System. All rights reserved.
          </p>
        </div>

        {/* Back to Top */}
        <button
          className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow"
          onClick={scrollToTop}
          title="Back to Top"
          style={{ width: "42px", height: "42px", zIndex: "1000" }}
        >
          <FaArrowUp />
        </button>
      </div>

      {/* Custom Styles */}
      <style>{`
        .icon-hover {
          transition: all 0.3s ease;
        }
        .icon-hover:hover {
          transform: scale(1.2);
          color: #66b3ff !important;
        }

        .link-hover {
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .link-hover:hover {
          color: #66b3ff !important;
          transform: scale(1.05);
        }

        .section-box {
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .section-box:hover {
          box-shadow: 0 0 15px rgba(102,179,255,0.4);
          transform: scale(1.02);
        }

        footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #66b3ff, #003366, #66b3ff);
          background-size: 200% auto;
          animation: glow-line 6s linear infinite;
        }

        @keyframes glow-line {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        footer::after {
          content: '';
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%);
          filter: blur(50px);
          z-index: 0;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
