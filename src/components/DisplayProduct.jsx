import React, { useState, useEffect } from "react";
import "./DisplayProduct.css";
import { useNavigate } from "react-router-dom";
const filters = ["All", "Women", "Men", "Kid", "Accessories", "Cosmetics","Electronics"];
import { addToCart } from "../utils/cartHelper.js";
import SuccessModal from "./SuccessModal.jsx";
const DisplayProduct = ({header="NEW PRODUCTS" ,category="",count=5}) => {
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
    setLoading(true);

    // // ✅ Dummy products for now
    // const dummyProducts = [
    //   {
    //     id: 1,
    //     title: "Slim striped pocket shirt",
    //     price: 59,
    //     category: "Men",
    //     img: "https://preview.colorlib.com/theme/ashion/img/product/product-1.jpg.webp",
    //   },
    //   {
    //     id: 2,
    //     title: "Tropical Kimono",
    //     price: 49,
    //     oldPrice: 59,
    //     category: "Women",
    //     img: "https://preview.colorlib.com/theme/cozastore/images/product-02.jpg.webp",
    //     sale: true,
    //   },
    //   {
    //     id: 3,
    //     title: "Cotton oversized t-shirt",
    //     price: 39,
    //     category: "Kid",
    //     img: "https://preview.colorlib.com/theme/cozastore/images/product-06.jpg.webp",
    //   },
    //   {
    //     id: 4,
    //     title: "Accessories Pack",
    //     price: 19,
    //     category: "Accessories",
    //     img: "https://preview.colorlib.com/theme/cozastore/images/product-15.jpg.webp",
    //   },
    //   {
    //     id: 5,
    //     title: "Cosmetic Combo",
    //     price: 99,
    //     category: "Cosmetics",
    //     img: "https://preview.colorlib.com/theme/cozastore/images/product-12.jpg.webp",
    //     sale: true,
    //     oldPrice: 120,
    //   },
    //   {
    //     id: 6,
    //     title: "Cosmetic Combo",
    //     price: 99,
    //     category: "Cosmetics",
    //     img: "https://preview.colorlib.com/theme/cozastore/images/product-12.jpg.webp",
    //     sale: true,
    //     oldPrice: 120,
    //   },
    //   {
    //     id: 7,
    //     title: "Cosmetic Combo",
    //     price: 99,
    //     category: "Cosmetics",
    //     img: "https://preview.colorlib.com/theme/cozastore/images/product-12.jpg.webp",
    //     sale: true,
    //     oldPrice: 120,
    //   },
    //   {
    //     id: 8,
    //     title: "Cosmetic Combo",
    //     price: 99,
    //     category: "Cosmetics",
    //     img: "https://preview.colorlib.com/theme/cozastore/images/product-12.jpg.webp",
    //     sale: true,
    //     oldPrice: 120,
    //   },
    //   {
    //     id: 9,
    //     title: "Cosmetic Combo",
    //     price: 99,
    //     category: "Cosmetics",
    //     img: "https://preview.colorlib.com/theme/cozastore/images/product-12.jpg.webp",
    //     sale: true,
    //     oldPrice: 120,
    //   },
    //   {
    //     id: 10,
    //     title: "Slim striped pocket shirt",
    //     price: 59,
    //     category: "Men",
    //     img: "https://preview.colorlib.com/theme/ashion/img/product/product-1.jpg.webp",
    //   },{
    //     id: 11,
    //     title: "Slim striped pocket shirt",
    //     price: 59,
    //     category: "Men",
    //     img: "https://preview.colorlib.com/theme/ashion/img/product/product-1.jpg.webp",
    //   },{
    //     id: 12,
    //     title: "Slim striped pocket shirt",
    //     price: 59,
    //     category: "Men",
    //     img: "https://preview.colorlib.com/theme/ashion/img/product/product-1.jpg.webp",
    //   },{
    //     id: 13,
    //     title: "Slim striped pocket shirt",
    //     price: 59,
    //     category: "Men",
    //     img: "https://preview.colorlib.com/theme/ashion/img/product/product-1.jpg.webp",
    //   },
    //   {
    //     id: 14,
    //     title: "Slim striped pocket shirt",
    //     price: 59,
    //     category: "Men",
    //     img: "https://preview.colorlib.com/theme/ashion/img/product/product-1.jpg.webp",
    //   },
    //   {
    //     id: 15,
    //     title: "Slim striped pocket shirt",
    //     price: 59,
    //     category: "Men",
    //     img: "https://preview.colorlib.com/theme/ashion/img/product/product-1.jpg.webp",
    //   },
    // ];

    // setAllProducts(dummyProducts);
    // setFilteredProducts(dummyProducts);
    // setLoading(false);

    // ✅ Backend fetch (uncomment when ready)
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    
  }, []);

  // ✅ Filter products whenever filter changes
useEffect(() => {
  if(category && category !== "All") {
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
      <h2 className="section-title" style={{fontSize: header === "RELATED PRODUCTS" ? "30px" : "40px" }}>{header}</h2>

      {/* ✅ Filters Desktop */}
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

      {/* ✅ Filters Mobile Dropdown */}
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

      {/* ✅ Product Grid */}
      <div className="product-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          filteredProducts.slice(0, visibleCount).map((product) => (
            <div key={product._id} className="product-card">
              {product.label && <span className="sale-badge">SALE</span>}

              <div className="product-img">
                <img src={product.images[0].url} alt={product.productName} />
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
                  <button className="icon">
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
        )}
        {showSuccessModal && <SuccessModal
            show={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            productName={selectedProduct.productName}
          />}
      </div>

      {/* ✅ Load More Button */}
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
