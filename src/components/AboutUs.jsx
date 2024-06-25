import React from "react";
import "./AboutUs.css";
const AboutUs = () => {
  return (
    <>
      <div className="About-container">
        {/* <h1>Our History</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          repellat recusandae accusantium sapiente natus sit perspiciatis velit
          repellendus unde quibusdam aut, iure expedita, itaque incidunt vitae
          nemo? Possimus, vel ex.
        </p>
        <h1>Our Mission</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          repellat recusandae  expedita, itaque incidunt vitaeex.
        </p>
        <h1>Our Vision</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          repellat recusandae.
        </p> */}
        {/* *******************ye bina cards wal ha *************************************** */}

        <section className="cards-wrapper">
          <div className="card-grid-space">
            <div className="card">
              <div>
                <h1>Our History</h1>
                <p>
                  Founded in <strong>2017</strong>, we started locally with a
                  commitment to quality and great service. Today, we're a
                  trusted online store serving customers across the country,
                  driven by our dedication to customer satisfaction and high
                  standards.
                </p>
              </div>
            </div>
          </div>
          <div className="card-grid-space">
            <div className="card">
              <div>
                <h1>Our Mission</h1>
                <p>
                  At <strong>"Shoppi"</strong>, our mission is to deliver
                  high-quality products and exceptional customer service. We
                  strive to provide a seamless shopping experience with
                  competitive prices, ensuring every customer finds what they
                  need with ease and satisfaction.
                </p>
              </div>
            </div>
          </div>
          <div className="card-grid-space">
            <div className="card">
              <div>
                <h1>Our Vision</h1>
                <p>
                  At <strong>"Shoppi"</strong>, our vision is to make
                  online shopping simple and enjoyable with great products.
                  We're committed to offering a hassle-free experience, caring
                  for the environment, and helping our community. Join us as we
                  make shopping easier and more fun for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
