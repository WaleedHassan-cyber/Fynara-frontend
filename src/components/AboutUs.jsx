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
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam repellat recusandae accusantium sapiente natus sit
                  perspiciatis velit repellendus unde quibusdam aut, iure
                  expedita, itaque incidunt vitae nemo? Possimus, vel ex
                </p>
              </div>
            </div>
          </div>
          <div className="card-grid-space">
            <div className="card">
              <div>
                <h1>Our Mission</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam repellat recusandae expedita, itaque incidunt vitaeex.
                </p>
              </div>
            </div>
          </div>
          <div className="card-grid-space">
            <div className="card">
              <div>
                <h1>Our Vision</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam repellat recusandae lorem50
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
