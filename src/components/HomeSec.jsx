import React, { useState } from "react";
import "./HomeSec.css";
import DisplayProduct from "./DisplayProduct.jsx";
import Banner from "./Banner.jsx";
import Features from "./Features.jsx";

const categories = [
  {
    id: 1,
    title: "Women",
    subtitle: "Spring 2018",
    image: "https://preview.colorlib.com/theme/cozastore/images/banner-01.jpg.webp",
  },
  {
    id: 2,
    title: "Men",
    subtitle: "Spring 2018",
    image: "https://preview.colorlib.com/theme/cozastore/images/banner-02.jpg.webp",
  },
  {
    id: 3,
    title: "Accessories",
    subtitle: "New Trend",
    image: "https://preview.colorlib.com/theme/cozastore/images/banner-03.jpg.webp",
  },
];

const HomeSec = () => {
  const [showComponent, setShowComponent] = useState("ComponentA");

  const handleButtonClick = (componentName) => {
    setShowComponent(componentName);
  };

  return (
    <>
    <section className="category-section">
        <h2 className="category-head">CATEGORY</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            <img src={cat.image} alt={cat.title} className="category-image" />

            {/* 👇 ye overlay hamesha image ke upar hi rahega */}
            <div className="category-overlay">
              <h3 className="category-title">{cat.title}</h3>
              <p className="category-subtitle">{cat.subtitle}</p>
              <a href={`/products/${cat.title}`} className="shop-now">
                SHOP NOW
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
    <DisplayProduct/>
    <Banner/>
    <Features/>
    </>
  );
};

export default HomeSec;
