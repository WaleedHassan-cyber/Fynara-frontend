import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomeSec from "../components/HomeSec";
import Footer from "../components/Footer";
// https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg="https://img.freepik.com/premium-photo/black-friday-sale-decoration-background-with-shopping-trolley-copy-space_257995-187.jpg?w=900"
        title="Smarter Shopping Starts Here"
        text="Choose Your Favourite Product"
        btntext="Shop"
        btnClass="show"
        url="/products"
      />
      <HomeSec />
      <Footer />
    </>
  );
};

export default Home;
