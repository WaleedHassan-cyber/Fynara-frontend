import React from "react";
import "./OurProducts.css";
const OurProducts = () => {
  return (
    <>
      <div className="section">
        <h1>Our Products</h1>
        <p>Choose Different💖</p>
      </div>

      <div className="hero-section">
        <div className="card-grid">
          <a className="card" href="#">
            <div className="card__background one"></div>
            <div className="card__content">
              <h3 className="card__heading">Women Dress</h3>
            </div>
          </a>
          <a className="card" href="#">
            <div className="card__background two"></div>
            <div className="card__content">
              <h3 className="card__heading">Curtains And Blinds</h3>
            </div>
          </a>
          <a className="card" href="#">
            <div className="card__background three"></div>
            <div className="card__content">
              <h3 className="card__heading">Sofas</h3>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default OurProducts;
