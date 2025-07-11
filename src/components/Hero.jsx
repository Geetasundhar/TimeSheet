import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapCard from "../components/BootstrapCard";

const Home = () => {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">
            Streamline Your HR Operations with TANSAM people
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
            <BootstrapCard title="Employee Database" description="Maintain centralized employee records." />
            <BootstrapCard title="Leave Management" description="Automate leave tracking and approvals." />
            <BootstrapCard title="Attendance Tracking" description="Monitor employee attendance effortlessly." />
            <BootstrapCard title="Performance Reviews" description="Streamline appraisals and feedback." />
          </div>
        </div>
      </section>

      {/* Use Cases / Modules */}
      <section className="usecases-section bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Us?</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <img src="/assets/images/onboarding.svg" alt="Onboarding" className="mb-3" height="80" />
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
    </main>
  );
};

export default Home;
