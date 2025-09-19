import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Product from "./routes/Product";
import "./App.css";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import ProductDetail from "./components/ProductDetails.jsx";
import Cart from "./components/Cart.jsx";
import Contact from "./components/Contact.jsx";

function App() {
  return (
    <>
      <div className="App">
        <Hero />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:category" element={<Product />} />
          {/* Dynamic category */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}
export default App;
