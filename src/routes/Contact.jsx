import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
// import { Card } from "../components/Card";
import "./contact.css"
import Footer from "../components/Footer";
import Section from "../components/Section";
const Contact = () => {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg="https://images.pexels.com/photos/326576/pexels-photo-326576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Contact Us"
        btnClass="hide"
      />
      

      {/* <h1>Easy To Contact Us</h1>
      <p>we alwys to help by providing the best product for you</p>
      <Card
       title="Call"
       description= "03268597887"
       buttonText="Call Now"
       link="/"
       Icon="fa-solid fa-phone"
      /> */}
      <Section/>
      <Footer/>  
    </>
  );
};

export default Contact;
