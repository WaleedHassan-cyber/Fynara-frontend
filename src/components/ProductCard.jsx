import React from "react";
import "./ProductCard.css";
const ProductCard = (props) => {
  return (
    <>
      <div className="flexbox">
        <div className="product-card">
          <div className="badge">{props.badge}</div>
          <div className="product-tumb">
            <img src={props.src} alt="" />
          </div>
          <div className="product-details">
            <span className="product-catagory">{props.pc}</span>
            <h4>
              <a href="">{props.pa}</a>
            </h4>
            <p></p>
            <div className="product-bottom-details">
              <div className="product-price">
                <small>{props.sprice}</small>
                {props.oprice}
              </div>
              <div className="product-links">
                <a href="">
                  <i className="fa fa-heart"></i>
                </a>
                <a href="https://wa.me/+923268597887">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default ProductCard;
