import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'; // Ensure you installed react-bootstrap
import '../App.css';

const Home = () => {
  return (
   <main className="home-page">
  {/* Hero Section */}
  <main className="home-page">
  {/* Hero Section */}
<section
  className="hero-section bg-light d-flex align-items-center justify-content-center"
  style={{
    minHeight: '55vh',
    padding: '30px 0 10px 0',
    transition: 'all 0.8s ease-in-out',
  }}
>
  <div
    className="text-center"
    style={{
      maxWidth: '720px',
      width: '90%',
      margin: '0 auto',
    }}
  >
    {/* Modernized Heading */}
    <h1
      className="fw-bold"
      style={{
        fontSize: '2.2rem',
        lineHeight: '1.6',
        color: '#111',
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 0.8s ease-in-out',
      }}
    >
      Empower Your Workforce with a Smarter, Faster, and Simpler HR Solution
    </h1>

    {/* Improved Subtext */}
    <p
      className="text-muted"
      style={{
        fontSize: '1.1rem',
        marginTop: '20px',
        marginBottom: '30px',
        lineHeight: '1.8',
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 0.8s ease-in-out 0.4s',
      }}
    >
      TANSAM People helps you streamline everything from employee onboarding to performance reviews — all from one powerful dashboard.
    </p>

    {/* Get Started Button with animation and custom color */}
    <button
      className="btn"
      style={{
        padding: '12px 28px',
        fontSize: '1rem',
        fontWeight: '600',
        borderRadius: '8px',
        color: '#fff',
        backgroundColor: '#4A00E0', // Vibrant blue-violet
        backgroundImage: 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)',
        boxShadow: '0 4px 14px rgba(138, 43, 226, 0.3)',
        border: 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.boxShadow = '0 6px 18px rgba(138, 43, 226, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 4px 14px rgba(138, 43, 226, 0.3)';
      }}
    >
      Get Started Free
    </button>
  </div>
</section>


  {/* Key Features Section (example) */}
  <section
    className="key-features"
    style={{
      marginTop: '20px', // Reduced top space
      padding: '20px',
      textAlign: 'center',
    }}
  >
    <h2>Key Features</h2>
    <p>Some quick features of our HR management system.</p>
    {/* Add features here */}
  </section>
</main>



      {/* Features Section */}
      <section className="features-section py-5">
  <div className="container">
    <h2 className="text-center mb-5">Key Features</h2>
    <div className="row g-4">
      {[
        {
          title: "Employee Database",
          text: "Maintain centralized employee records.",
        },
        {
          title: "Leave Management",
          text: "Automate leave tracking and approvals.",
        },
        {
          title: "Attendance Tracking",
          text: "Monitor employee attendance effortlessly.",
        },
        {
          title: "Performance Reviews",
          text: "Streamline appraisals and feedback.",
        },
      ].map((feature, index) => (
        <div className="col-md-3" key={index}>
          <div className="card feature-card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title">{feature.title}</h5>
              <p className="card-text">{feature.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Use Cases / Modules */}
  <section className="usecases-section py-5">
  <div className="container">
    <h2 className="text-center mb-5">Why Choose Us?</h2>
    <div className="row text-center">
      <div className="col-md-4">
        <div className="usecase-card p-4">
          <img
            src="/assets/images/onboarding.png"
            alt="Onboarding"
            className="mb-3"
            style={{filter:"none"}}
            height="80"
        
          />
          <h5>Seamless Onboarding</h5>
          <p>Automated workflows for faster employee onboarding.</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="usecase-card p-4">
          <img
            src="/assets/images/automation-cover.png"
            alt="Automation"
            className="mb-3"
            height="80"
            style={{filter:"none"}}
          />
          <h5>Smart Automation</h5>
          <p>Automate repetitive HR tasks and focus on people.</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="usecase-card p-4">
          <img
            src="/assets/images/analytics.png"
            alt="Analytics"
            className="mb-3"
            height="80"
            style={{filter:"none"}}
          />
          <h5>Advanced Analytics</h5>
          <p>Data-driven insights to improve HR decisions.</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Projects / Modules Section */}
<section className="projects-section py-5 bg-light">
  <div className="container">
    {/* Heading */}
    <h2 className="text-center fw-bold mb-3">Our Modules</h2>
    <p
      className="text-center text-muted mb-5"
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.7',
      }}
    >
      Transform your workplace with intelligent, flexible, and intuitive modules — tailored for tomorrow’s HR teams.
    </p>

    {/* Module 1: HR Management System */}
    <div className="row g-4 align-items-center mb-5 animate__animated animate__fadeInLeft">
      <div className="col-md-6">
        <img
<<<<<<< Updated upstream
          src="/assets/images/management.png"
=======
          src="/assets/images/automation-cover.png"
>>>>>>> Stashed changes
          alt="HR Management"
          style={{
            width: '100%',
            maxWidth: '500px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/500x300?text=HR+Image+Missing';
          }}
        />
      </div>
      <div className="col-md-6">
        <h4 className="fw-bold mb-2">HR Management System</h4>
        <p style={{ lineHeight: '1.8' }}>
          Take control of the entire employee journey — from smart onboarding and seamless payroll to
          effortless leave tracking and compliance — all in one sleek, integrated solution.
        </p>
      </div>
    </div>

    <hr className="my-4" />

    {/* Module 2: Timesheet Tracking */}
    <div className="row g-4 align-items-center flex-md-row-reverse mb-5 animate__animated animate__fadeInRight">
      <div className="col-md-6">
        <img
          src="/assets/images/module-timesheet.png"
          alt="Timesheet Tracker"
          style={{
            width: '100%',
            maxWidth: '500px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/500x300?text=HR+Image+Missing';
          }}
        />
      </div>
      <div className="col-md-6">
        <h4 className="fw-bold mb-2">Advanced Timesheet Tracking</h4>
        <p style={{ lineHeight: '1.8' }}>
          Ditch the spreadsheets. Easily log hours, approve timesheets, and analyze team productivity
          with real-time tracking that’s built for modern work culture.
        </p>
      </div>
    </div>

    <hr className="my-4" />

    {/* Module 3: Smart Analytics */}
    <div className="row g-4 align-items-center animate__animated animate__fadeInUp">
      <div className="col-md-6">
        <img
          src="/assets/images/module-analytics.png"
          alt="HR Analytics"
          style={{
            width: '100%',
            maxWidth: '500px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/500x300?text=HR+Image+Missing';
          }}
        />
      </div>
      <div className="col-md-6">
        <h4 className="fw-bold mb-2">Smart Analytics</h4>
        <p style={{ lineHeight: '1.8' }}>
          Go beyond raw data — unlock actionable insights with stunning dashboards that spotlight attendance trends,
          team performance, and resource utilization.
        </p>
      </div>
    </div>
  </div>
</section>




{/* Testimonials */}
<section
  className="testimonials-section py-5"
  style={{
    background: 'linear-gradient(135deg,hsl(257, 43.30%, 86.90%),hsl(316, 39.30%, 89.00%))',
    padding: '3rem 0',
  }}
>
  <div
    className="container py-5 px-4"
    style={{
      background: 'linear-gradient(135deg,rgb(251, 250, 253), #e0f0ff)',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    }}
  >
    <h2
      className="text-center fw-bold mb-5"
      style={{ color: '#4b0082' }}
    >
      Trusted by Teams Globally
    </h2>

    <div className="row g-4 justify-content-center">
      {/* Testimonial 1 */}
      <div className="col-md-4">
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            textAlign: 'center',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(128, 0, 128, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.08)';
          }}
        >
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Sarah"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '1rem',
            }}
          />
          <p
            className="fst-italic"
            style={{ fontSize: '1.05rem', color: '#333', lineHeight: '1.7' }}
          >
            "This tool transformed our HR operations. Simple, powerful, and intuitive!"
          </p>
          <p style={{ fontSize: '1.2rem', color: '#ffc107', margin: '0.5rem 0' }}>
            ⭐⭐⭐⭐⭐
          </p>
          <h6 className="fw-semibold" style={{ color: '#6a1b9a' }}>
            – Sarah, HR Manager
          </h6>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="col-md-4">
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            textAlign: 'center',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(128, 0, 128, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.08)';
          }}
        >
          <img
            src="https://randomuser.me/api/portraits/men/46.jpg"
            alt="James"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '1rem',
            }}
          />
          <p
            className="fst-italic"
            style={{ fontSize: '1.05rem', color: '#333', lineHeight: '1.7' }}
          >
            "Our productivity has soared with automated attendance and leave tracking."
          </p>
          <p style={{ fontSize: '1.2rem', color: '#ffc107', margin: '0.5rem 0' }}>
            ⭐⭐⭐⭐⭐
          </p>
          <h6 className="fw-semibold" style={{ color: '#6a1b9a' }}>
            – James, Team Lead
          </h6>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="col-md-4">
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            textAlign: 'center',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(134, 106, 143, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.08)';
          }}
        >
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="Priya"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '1rem',
            }}
          />
          <p
            className="fst-italic"
            style={{ fontSize: '1.05rem', color: '#333', lineHeight: '1.7' }}
          >
            "Love the smart dashboards. It’s like HR magic at our fingertips!"
          </p>
          <p style={{ fontSize: '1.2rem', color: '#ffc107', margin: '0.5rem 0' }}>
            ⭐⭐⭐⭐⭐
          </p>
          <h6 className="fw-semibold" style={{ color: '#6a1b9a' }}>
            – Alice, CEO
          </h6>
        </div>
      </div>
    </div>
  </div>
</section>




      {/* Final CTA Band */}
<<<<<<< Updated upstream
      <section className="cta-section bg-primary text-white text-center py-5">
        <div className="container">
          <h2>Start Managing Your Workforce Better</h2>
          <p className="mb-4">Try it free for 15 days. No credit card required.</p>
          <Button variant="light" className="px-4 py-2">Sign Up Now</Button>
        </div>
      </section>
     {/* Trusted Partners */}
<section
  className="partners-section py-5"
  style={{
    background: 'rgb(255,255,255)', // soft purple background
  }}
>
=======


<section className="cta-section text-white text-center">
  <div className="cta-wrapper">
    <h2 className="mb-3">Start Managing Your Workforce Better</h2>
    <p className="mb-4">Try it free for 15 days. No credit card required.</p>
    <Button variant="light" className="px-4 py-2 fw-semibold shadow-sm cta-button">
      Sign Up Now
    </Button>
  </div>
</section>




      {/* Trusted Partners */}
<section className="partners-section py-5 bg-white">
>>>>>>> Stashed changes
  <div className="container text-center">
    <h2
      className="mb-4 fw-bold"
      style={{
        color:4788e7,
        fontSize: '2rem',
        letterSpacing: '0.5px',
      }}
    >
      Trusted by Leading Companies
    </h2>

    <div className="row justify-content-center align-items-center g-4">
      {[1, 2, 3, 4].map((index) => (
        <div className="col-6 col-md-2" key={index}>
          <div
            style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '1rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(76, 0, 130, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.06)';
            }}
          >
            <img
              src={`/assets/images/logo${index}.png`}
              alt={`Partner ${index}`}
              className="img-fluid"
              style={{
                maxHeight: '60px',
                objectFit: 'contain',
                filter: 'grayscale(20%)',
                transition: 'filter 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.filter = 'grayscale(0%)')}
              onMouseOut={(e) => (e.currentTarget.style.filter = 'grayscale(20%)')}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


</main>
  );
};

export default Home;
