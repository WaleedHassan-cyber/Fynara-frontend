import logo from "../assets/Logo2.png";
import "./OrderLoader.css";

const OrderLoader = () => {
  return (
    <div className="main-loader">
      <div className="loader-container">
        <div className="loader-wrapper">
          <div className="circle"></div>
          <div className="stylish-line"></div>
          <img src={logo} alt="Fynara Logo" className="logo" />
        </div>
      </div>
    </div>
  );
};

export default OrderLoader;
