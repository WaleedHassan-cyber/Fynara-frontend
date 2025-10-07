import React from "react";
import { FaCarSide } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaLifeRing } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Breakcrumb from "./Breadcrumb.jsx";
import "./Features.css";

const features = [
  {
    icon: <FaCarSide />,
    title: "Free Shipping",
    desc: "For all order over $99",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Money Back Guarantee",
    desc: "If good have Problems",
  },
  {
    icon: <FaLifeRing />,
    title: "Online Support 24/7",
    desc: "Dedicated support",
  },
  {
    icon: <FaLock />,
    title: "Payment Secure",
    desc: "100% secure payment",
  },
];

const Features = () => {
  return (
    
    <section className="features">
      <Breakcrumb crumb="Features" />
      {features.map((feature, index) => (
        <div className="feature-card" key={index}>
          <div className="feature-icon">{feature.icon}</div>
          <div>
            <h4 className="feature-title">{feature.title}</h4>
            <p className="feature-desc">{feature.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
