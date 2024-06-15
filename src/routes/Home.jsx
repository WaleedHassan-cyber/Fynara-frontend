import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomeSec from "../components/HomeSec";
import Footer from "../components/Footer";
;
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg="https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Unleash Your Inner Fashionista"
        text="Choose Your Favourite Dress"
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
