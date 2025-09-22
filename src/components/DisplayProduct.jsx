import React, { useState, useEffect } from "react";
import "./DisplayProduct.css";
import { useNavigate, Link } from "react-router-dom";
const filters = ["All", "Women", "Men", "Kid", "Accessories", "Cosmetics", "Electronics"];
import { addToCart } from "../utils/cartHelper.js";
import SuccessModal from "./SuccessModal.jsx";
import Loader from "./Loader.jsx";
const DisplayProduct = ({ header = "NEW PRODUCTS", category = "", count = 8 }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(count ? count : 4);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setAllProducts(data);
          setFilteredProducts(data);
        } else {
          setAllProducts([]);
          setFilteredProducts([]);
          console.error("API did not return an array of products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setAllProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  useEffect(() => {
    if (category && category !== "All") {
      setFilteredProducts(allProducts.filter(p => p.type?.toLowerCase() === category.toLowerCase()));
    } else {
      if (activeFilter === "All") {
        setFilteredProducts(allProducts);
      } else {
        setFilteredProducts(allProducts.filter(p => p.type === activeFilter));
      }
    }
    setVisibleCount(count ? count : 4);
  }, [category, activeFilter, allProducts, count]);

  const handleQuickAdd = async (product) => {
    const user = JSON.parse(localStorage.getItem("user:detail"));
    if (!user) return alert("Please login first!");

    const result = await addToCart({
      userId: user.id,
      product,
      quantity: 1,
      selectedColor: null,
      selectedSize: null,
    });

    if (result.success) {
      setSelectedProduct(product);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
    } else {
      alert("❌ " + result.message);
    }
  };

  return (
    <section className="new-product">
      <h2 className="section-title" style={{ fontSize: header === "RELATED PRODUCTS" ? "30px" : "40px" }}>{header}</h2>

      {!category && (
        <div className="filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <select
        className="filters-dropdown"
        value={activeFilter}
        onChange={(e) => setActiveFilter(e.target.value)}
      >
        {filters.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      <div className="product-grid">
        {loading ? (
          <><div className="loader" ><Loader/></div></>
        ) : (
          Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.slice(0, visibleCount).map((product) => (
              <div key={product._id} className="product-card">
                {product.label && <span className="sale-badge">SALE</span>}

                <div className="product-img">
                  <img src={product.images[0]?.url} alt={product.productName} />
                  <div className="icons">
                    <button className="icon" onClick={() => navigate(`/product/${product._id}`)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/glremacu.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#000000"
                        style={{ width: "24px", height: "24px" }}
                      ></lord-icon>
                    </button>
                    <button  className="icon">
                      <lord-icon
                        src="https://cdn.lordicon.com/efgqjiqt.json"
                        trigger="hover"
                        colors="primary:#000000"
                        style={{ width: "24px", height: "24px" }}
                      ></lord-icon>
                    </button>
                    <button className="icon" onClick={() => handleQuickAdd(product)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/njmquueq.json"
                        trigger="hover"
                        colors="primary:#000000"
                        style={{ width: "24px", height: "24px" }}
                      ></lord-icon>
                    </button>
                  </div>
                  
                </div>

                <h3 className="product-title">{product.productName}</h3>
                <div className="product-price">
                  <div className="product-rating">★★★★★</div>
                  <span className="new-price">${product.price}</span>
                  {product.oldPrice && (
                    <span className="old-price">${product.oldPrice}</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )
        )}
        {showSuccessModal && <SuccessModal
          show={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          productName={selectedProduct?.productName}
        />}
      </div>

      {visibleCount < filteredProducts.length && !loading && (
        <div className="load-more-wrapper">
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default DisplayProduct;
