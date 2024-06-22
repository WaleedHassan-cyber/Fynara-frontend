import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

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
      <Footer/>
    </>
  );
};

export default Product;
