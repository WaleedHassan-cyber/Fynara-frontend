import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./HeroSlider.css";

const slides = [
  {
    id: 1,
    category: "Men Collection 2018",
    title: "NEW ARRIVALS",
    image: "https://preview.colorlib.com/theme/cozastore/images/banner-02.jpg.webp",
  },
  {
    id: 2,
    category: "Women Collection 2018",
    title: "ELEGANT STYLES",
    image: "https://preview.colorlib.com/theme/cozastore/images/banner-03.jpg.webp",
  },
  {
    id: 3,
    category: "Street Collection 2018",
    title: "CASUAL WEAR",
    image: "https://preview.colorlib.com/theme/cozastore/images/banner-01.jpg.webp",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((c) => (c + 1) % slides.length);
  const prevSlide = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="hero-overlay" />
          {index === current && (
            <div className="hero-text">
              <p className="hero-category">{slide.category}</p>
              <h1 className="hero-title">{slide.title}</h1>
              <button className="hero-button">SHOP NOW</button>
            </div>
          )}
        </div>
      ))}

      {/* Arrows */}
      <button className="hero-arrow left" onClick={prevSlide}>
        <ChevronLeft size={22} />
      </button>
      <button className="hero-arrow right" onClick={nextSlide}>
        <ChevronRight size={22} />
      </button>

      {/* Indicators */}
      <div className="hero-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`indicator ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
