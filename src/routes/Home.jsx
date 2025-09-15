import React from "react";
import HomeSec from "../components/HomeSec";
import HeroSlider from "../components/HeroSlider.jsx";
// https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSlider/>
      <HomeSec />
    </>
  );
};

export default Home;
