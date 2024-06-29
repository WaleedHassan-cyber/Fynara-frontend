import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import OurProducts from "../components/OurProducts";



const Product = () => {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg="https://img.freepik.com/premium-photo/bag-made-from-paper_101448-780.jpg?w=740"
        title="Products"
        text="Shop🛒. Smile😊. Repeat❤"
        btnClass="hide"
      />
      <OurProducts/>
      <Footer />
    </>
  );
};

export default Product;
