
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './Navbar.css'; 
import navbarIcon from '../assets/images/tansamlogo.png';

const Navbar = () => {


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const isSmallDevice = windowWidth < 992;
  const shouldApplyGlass = (isSmallDevice && isMenuOpen) || isScrolled;
  const navbarClass = shouldApplyGlass ? 'glass-gradient' : 'gradient-bg';
  const handleRipple = (e) => {
  const button = e.currentTarget;
  const circle = document.createElement('span');

  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add('ripple');
  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) ripple.remove();

  circle.className = 'ripple';
  button.appendChild(circle);
}
  return (
    <nav className={`navbar navbar-expand-lg fixed-top shadow-sm ${navbarClass}}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand d-flex align-items-center brand-animated" href="#home">
        <img
          src={navbarIcon}
          alt="Logo"
          height="40"
          className="logo-img me-2"
        />
        <span className="brand-title-gradient">Timesheet Tracker</span>
        </a>

        <button
         className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
        >
 
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end ${isMenuOpen ? 'show show-bg' : ''" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
            <li className="nav-item">
              <a className="btn login-btn ms-3" href="#login" onClick={handleRipple}>
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
