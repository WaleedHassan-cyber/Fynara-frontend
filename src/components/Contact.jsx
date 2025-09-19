import React from "react";
import "./Contact.css";
import Breadcrumb from "./Breadcrumb.jsx";

const Contact = () => {
  return (
    <>
      <Breadcrumb crumb="Contact Us" />
    <div className="contact-container">
      {/* Breadcrumb */}

      <div className="contact-content">
        {/* Left Side */}
        <div className="contact-info">
          <h2>CONTACT INFO</h2>
          <p><i className="fas fa-map-marker-alt"></i> 
            <strong> Address</strong><br />
            160 Pennsylvania Ave NW, Washington, Castle, PA 16101-5161
          </p>
          <p><i className="fas fa-phone"></i> 
            <strong> Phone</strong><br />
            125-711-811 &nbsp; | &nbsp; 125-668-886
          </p>
          <p><i className="fas fa-headset"></i> 
            <strong> Support</strong><br />
            Support.photography@gmail.com
          </p>

          {/* Send Message Form */}
          <h3>SEND MESSAGE</h3>
          <form className="contact-form">
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Right Side (Google Map) */}
        <div className="contact-map">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.801748119486!2d-74.096098!3d40.960654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2fbf81e9f2a4d%3A0x3c0d8df7a2b9b1a2!2sSaddle%20River%2C%20NJ%2007458%2C%20USA!5e0!3m2!1sen!2s!4v1694978427196"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
