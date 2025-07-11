import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'; // Ensure you installed react-bootstrap

const Home = () => {
  return (
    <main className="home-page">
      {/* Hero Section */}
     <section className="hero-section bg-light min-vh-100 d-flex align-items-center justify-content-center">
  <div className="container text-center">
    <h1 className="display-4 fw-bold">
      Streamline Your HR Operations with <span className="text-primary">TANSAM People</span>
    </h1>
    <p className="lead text-muted mt-3">
      A complete HR solution to manage, automate, and simplify your HR processes.
    </p>
    <Button className="mt-4 px-4 py-2">Get Started Free</Button>
  </div>
</section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Key Features</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Employee Database</h5>
                  <p className="card-text">Maintain centralized employee records.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Leave Management</h5>
                  <p className="card-text">Automate leave tracking and approvals.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Attendance Tracking</h5>
                  <p className="card-text">Monitor employee attendance effortlessly.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Performance Reviews</h5>
                  <p className="card-text">Streamline appraisals and feedback.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases / Modules */}
      <section className="usecases-section bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Us?</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <img src="/assets/images/onboarding.svg" alt="onboarding" className="mb-3" height="80" />
              <h5>Seamless Onboarding</h5>
              <p>Automated workflows for faster employee onboarding.</p>
            </div>
            <div className="col-md-4">
              <img src="/assets/images/automation.svg" alt="Automation" className="mb-3" height="80" />
              <h5>Smart Automation</h5>
              <p>Automate repetitive HR tasks and focus on people.</p>
            </div>
            <div className="col-md-4">
              <img src="/assets/images/analytics.svg" alt="Analytics" className="mb-3" height="80" />
              <h5>Advanced Analytics</h5>
              <p>Data-driven insights to improve HR decisions.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Projects / Modules Section */}
<section className="projects-section py-5 bg-light">
  <div className="container">
    <h2 className="text-center mb-4">Our Modules</h2>
    <p className="text-center text-muted mb-5">
      Powerful, flexible, and scalable tools for your entire organization.
    </p>
    <div className="row g-4 align-items-center">
      <div className="col-md-6">
        <img
          src="/assets/images/module-hrm.png"
          alt="HR Management"
          className="img-fluid rounded shadow-sm"
        />
      </div>
      <div className="col-md-6">
        <h4>HR Management System</h4>
        <p>
          Manage your workforce lifecycle including onboarding, payroll, attendance,
          leaves, and more with our integrated HRM solution.
        </p>
      </div>
    </div>

    <hr className="my-5" />

    <div className="row g-4 align-items-center flex-md-row-reverse">
      <div className="col-md-6">
        <img
          src="/assets/images/module-timesheet.png"
          alt="Timesheet Tracker"
          className="img-fluid rounded shadow-sm"
        />
      </div>
      <div className="col-md-6">
        <h4>Advanced Timesheet Tracking</h4>
        <p>
          Track employee work hours, monitor productivity, generate reports, and simplify
          approvals with our intuitive timesheet module.
        </p>
      </div>
    </div>

    <hr className="my-5" />

    <div className="row g-4 align-items-center">
      <div className="col-md-6">
        <img
          src="/assets/images/module-analytics.png"
          alt="HR Analytics"
          className="img-fluid rounded shadow-sm"
        />
      </div>
      <div className="col-md-6">
        <h4>Smart Analytics</h4>
        <p>
          Gain insights into team performance, absenteeism trends, project allocation,
          and much more with actionable HR analytics.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Testimonials */}
      <section className="testimonials-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Trusted by Teams Globally</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm">
                <p>"This tool transformed our HR operations. Simple, powerful, and intuitive!"</p>
                <h6 className="mt-3 mb-0">– Sarah, HR Manager</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm">
                <p>"Our productivity has soared with automated attendance and leave tracking."</p>
                <h6 className="mt-3 mb-0">– James, Team Lead</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="cta-section bg-primary text-white text-center py-5">
        <div className="container">
          <h2>Start Managing Your Workforce Better</h2>
          <p className="mb-4">Try it free for 15 days. No credit card required.</p>
          <Button variant="light" className="px-4 py-2">Sign Up Now</Button>
        </div>
      </section>
      {/* Trusted Partners */}
<section className="partners-section py-5 bg-white">
  <div className="container text-center">
    <h2 className="mb-4">Trusted by Leading Companies</h2>
    <div className="row justify-content-center align-items-center g-3">
      <div className="col-4 col-md-2">
        <img src="/assets/images/logo1.png" alt="Partner 1" className="img-fluid" />
      </div>
      <div className="col-4 col-md-2">
        <img src="/assets/images/logo2.png" alt="Partner 2" className="img-fluid" />
      </div>
      <div className="col-4 col-md-2">
        <img src="/assets/images/logo3.png" alt="Partner 3" className="img-fluid" />
      </div>
      <div className="col-4 col-md-2">
        <img src="/assets/images/logo4.png" alt="Partner 4" className="img-fluid" />
      </div>
    </div>
  </div>
</section>


{/* Timesheet Output Preview */}
<section className="timesheet-preview py-5 bg-white">
  <div className="container">
    <h2 className="text-center mb-5">Preview: Timesheet Management</h2>
    <div className="row justify-content-center">
      <div className="col-md-8">
        <img src="/assets/images/timesheet-sample.png" alt="Timesheet Output" className="img-fluid border rounded shadow-sm" />
      </div>
    </div>
  </div>
</section>

    </main>
  );
};

export default Home;
