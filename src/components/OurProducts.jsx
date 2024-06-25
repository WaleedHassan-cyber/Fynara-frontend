import React from "react";
import "./OurProducts.css";
import { Link } from "react-router-dom";
const OurProducts = () => {
  return (
    <>
      <div className="section">
        <h1>Our Products</h1>
        <p>Choose Different💖</p>
      </div>

      <div className="hero-section">
        <div className="card-grid">
          <Link className="card1" to="/">
            <div className="card__background one"></div>
            <div className="card__content">
              <h3 className="card__heading">For Women</h3>
            </div>
          </Link>
          <Link className="card1" to="/">
            <div className="card__background two"></div>
            <div className="card__content">
              <h3 className="card__heading">Curtains And Blinds</h3>
            </div>
          </Link>
          <Link className="card1" to="/">
            <div className="card__background three"></div>
            <div className="card__content">
              <h3 className="card__heading">Sofas</h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OurProducts;
