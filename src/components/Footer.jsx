import "./Footer.css";

import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="top">
          <div>
            <h1>Shoppi</h1>
            <p>Chose Your Favourite Product</p>
          </div>
          <div>
            <a href="">
              <i className="fa-brands fa-facebook "></i>
            </a>
            <a href="">
              <i className="fa-brands fa-instagram "></i>
            </a>
            <a href="https://wa.me/+923268597887">
              <i className="fa-brands fa-whatsapp "></i>
            </a>
          </div>
        </div>
        <div className="bottom">
          <div>
            <h4>Project</h4>
            <a href="">Changelog</a>
            <a href="">Status</a>
            <a href="">lisense</a>
            <a href="">All versions</a>
          </div>
          <div>
            <h4>Community</h4>
            <a href="">Github</a>
            <a href="">Issues</a>
            <a href="">Project</a>
            <a href="">Whatsapp</a>
          </div>
          <div>
            <h4>Help</h4>
            <a href="">Support</a>
            <a href="">Contact US</a>
          </div>
          <div>
            <h4>Others</h4>
            <a href="">Terms of service</a>
            <a href="">Privacy Policy</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
