import React, { useState, useEffect } from "react";
import "./Banner.css";

const slides = [
  {
    id: 1,
    subtitle: "THE CHLOE COLLECTION",
    title: "The Project Jacket",
    btnText: "SHOP NOW",
  },
  {
    id: 2,
    subtitle: "NEW SUMMER COLLECTION",
    title: "Stylish Summer Dress",
    btnText: "SHOP NOW",
  },
  {
    id: 3,
    subtitle: "MEN'S FASHION",
    title: "Urban Jacket",
    btnText: "SHOP NOW",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="banner">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`banner-slide ${index === current ? "active" : ""}`}
        >
          <div className="banner-content">
            <p className="subtitle">{slide.subtitle}</p>
            <h2 className="title">{slide.title}</h2>
            <button className="banner-btn">{slide.btnText}</button>
          </div>
        </div>
      ))}

      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Banner;
