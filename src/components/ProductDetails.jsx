import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DisplayProduct from "./DisplayProduct.jsx";
import LinksImg from "./LinksImg.jsx";
import { addToCart } from "../utils/cartHelper.js";
import SuccessModal from "./SuccessModal.jsx";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);

        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found</p>;

  const changeImageIndex = (newIndex) => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setMainImageIndex(newIndex);
      setFadeClass("fade-in");
    }, 300);
  };

  const prevImage = () => {
    const newIndex =
      mainImageIndex === 0 ? product.images.length - 1 : mainImageIndex - 1;
    changeImageIndex(newIndex);
  };

  const nextImage = () => {
    const newIndex =
      mainImageIndex === product.images.length - 1 ? 0 : mainImageIndex + 1;
    changeImageIndex(newIndex);
  };

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user:detail"));
    if (!user) return alert("Please login first!");

    const result = await addToCart({
      userId: user.id,
      product,
      quantity,
      selectedColor,
      selectedSize,
    });

    if (result.success) {
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
    } else {
      alert("❌ " + result.message);
    }
  };
  

  return (
    <>
      <div className="product-detail">
        <Link to="/" className="back-link">
          &lt; Back to Products
        </Link>

        <div className="detail-content">
          {/* Left: Thumbnails + Main Image */}
          <div className="image-section">
            <div className="thumbnails">
              {product.images?.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`thumb-${idx}`}
                  onClick={() => changeImageIndex(idx)}
                  className={`thumb ${
                    mainImageIndex === idx ? "active" : ""
                  }`}
                />
              ))}
            </div>
            <div className="main-image-wrapper">
              <img
                src={product.images[mainImageIndex]?.url}
                alt={product.productName}
                className={`main-image ${fadeClass}`}
              />
              <button className="nav-btn left" onClick={prevImage}>
                ‹
              </button>
              <button className="nav-btn right" onClick={nextImage}>
                ›
              </button>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="info-section">
            <h1>{product.productName}</h1>
            {product.brand && <p className="brand">Brand: {product.brand}</p>}

            {product.reviews && (
              <div className="reviews">★★★★★ ({product.reviews} reviews)</div>
            )}

            <div className="price">
              <span className="current">${product.price}.0</span>
              {product.oldPrice && (
                <span className="old">${product.oldPrice}.0</span>
              )}
            </div>

            {product.desc && <p className="desc">{product.desc}</p>}

            {/* Quantity + Add to Cart */}
            <div className="quantity-row">
              <strong>Quantity:</strong>
              <button onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>
                −
              </button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              
            </div>

            {/* Colors */}
            {product.colors && (
              <>
                <div className="label">Available color:</div>
                <div className="color-options">
                  {product.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className={`color-circle ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Sizes */}
            {product.sizes && (
              <>
                <div className="label">Available size:</div>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <div
                      key={size}
                      className={`size-box ${
                        selectedSize === size ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="stock">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>
            <button className="add-cart" onClick={handleAddToCart}>
                ADD TO CART
              </button>
          </div>
        </div>

        {showSuccessModal && (
          <SuccessModal
            show={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            productName={product.productName}
          />
        )}
      </div>

      {/* Related Products */}
      <DisplayProduct header="RELATED PRODUCTS" category={product.type} count={4} />
      <LinksImg />
    </>
  );
};

export default ProductDetail;
