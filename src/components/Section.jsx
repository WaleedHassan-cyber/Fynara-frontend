import React from "react";
import "./Section.css";
import { Card } from "../components/Card";
const Section = () => {
  return (
    <>
      <div className="section">
        <h1>Get in touch with us</h1>
        <p>Enable conversation to establish a connection.</p>
        <p>
          <strong>Mon To Friday:</strong> 10am - 10pm
        </p>
        <div className="first-sec">
          <div className="sec-text">
            <h2>Easy To contact Us</h2>
            <p>
              We always ready to help by providing the best products for you. We
              value your feedback and are here to assist you with any questions
              or concerns you may have. Whether you need support, have a
              suggestion, or simply want to learn more about our services, our
              team is ready to help. Reach out to us directly via phone or
              email, and we strive to respond to all inquiries within 24 hours.
              Thank you for getting in touch with us; we look forward to
              connecting with you soon.
            </p>
          </div>
          <div className="cards">
            <div className="frst-row">
              <Card
                title="Chat"
                description="03268597887"
                buttonText="Chat Now"
                link="/"
                Icon="fa-brands fa-whatsapp"
              />
              <Card
                title="Video Call"
                description="03268597887"
                buttonText="Call Now"
                link="/"
                Icon="fa-solid fa-video"
              />
            </div>
            <div className="scnd-row">
              <Card
                title="Call"
                description="03268597887"
                buttonText="Call Now"
                link="/"
                Icon="fa-solid fa-phone"
              />
              <Card
                title="Message"
                description="03268597887"
                buttonText="Message Now"
                link="/"
                Icon="fa-regular fa-message"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
