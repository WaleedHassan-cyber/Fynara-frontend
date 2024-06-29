import React from "react";
import "./OurProducts.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Curtains from "./Curtains";
import Three from "./Three";
import Sofas from "./Sofas";

const OurProducts = () => {
  const [showComponent, setShowComponent] = useState("");
  const handleButtonClick = (componentName) => {
    setShowComponent(componentName);
  };
 
  return (
    <>
      <div className="section">
        <h1>Our Products</h1>
        <p>Choose Different💖</p>
      </div>
      <div className="hero-section">
        <div className="card-grid">
          <Link
            onClick={() => handleButtonClick("ComponentA")}
            className="card1"
            to=""
          >
            <div className="card__background one"></div>
            <div className="card__content">
              <h3 className="card__heading">For Women</h3>
            </div>
          </Link>
          <Link
            onClick={() => handleButtonClick("ComponentB")}
            className="card1"
            to=""
          >
            <div className="card__background two"></div>
            <div className="card__content">
              <h3 className="card__heading">Curtains And Blinds</h3>
            </div>
          </Link>
          <Link
            onClick={() => handleButtonClick("ComponentC")}
            className="card1"
            to=""
          >
            <div className="card__background three"></div>
            <div className="card__content">
              <h3 className="card__heading">Sofas</h3>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="flexbox">
      <hr style={{ border: '1px solid #D3D3D3',margin:'9px', width: '60%' }} />
        {showComponent === "ComponentA" && <Three />}
        {showComponent === "ComponentB" && <Curtains />}
        {showComponent === "ComponentC" && <Sofas />}
      </div>
    </>
  );
};

export default OurProducts;
