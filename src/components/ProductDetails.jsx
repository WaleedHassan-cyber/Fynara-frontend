import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DisplayProduct from "./DisplayProduct.jsx";
import LinksImg from "./LinksImg.jsx";
import { addToCart } from "../utils/cartHelper.js";
import SuccessModal from "./SuccessModal.jsx";
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

        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

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
      // console.log("Cart:", result.data.cartItems);
    } else {
      alert("❌ " + result.message);
    }
  };
  return (
    <>
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Link to="/" style={{ color: "#0077ff", textDecoration: "none" }}>
          &lt; Back to Products
        </Link>

        <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
          {/* Left Thumbnails + Main Image */}
          <div style={{ display: "flex", gap: "20px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {product.images?.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`thumb-${idx}`}
                  onClick={() => changeImageIndex(idx)}
                  style={{
                    width: "76px",
                    height: "76px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border:
                      mainImageIndex === idx
                        ? "2px solid #d32f2f"
                        : "1px solid #eee",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                position: "relative",
                width: "400px",
                height: "450px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={product.images[mainImageIndex]?.url}
                alt={product.productName}
                className={fadeClass}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  transition: "opacity 0.3s ease",
                }}
              />
              <button
                onClick={prevImage}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  border: "1px solid #d32f2f",
                  color: "#d32f2f",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  fontSize: "22px",
                  fontWeight: "bold",
                  lineHeight: "28px",
                  textAlign: "center",
                  userSelect: "none",
                  zIndex: 10,
                }}
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  border: "1px solid #d32f2f",
                  color: "#d32f2f",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  fontSize: "22px",
                  fontWeight: "bold",
                  lineHeight: "28px",
                  textAlign: "center",
                  userSelect: "none",
                  zIndex: 10,
                }}
              >
                ›
              </button>
            </div>
          </div>

          {/* Right details */}
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontSize: "2.2rem",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              {product.productName}
            </h1>

            {product.brand && (
              <p
                style={{
                  color: "#888",
                  fontSize: "0.9rem",
                  marginBottom: "8px",
                }}
              >
                Brand: {product.brand}
              </p>
            )}

            {product.reviews && (
              <div
                style={{
                  color: "#f7b500",
                  marginBottom: "12px",
                  fontSize: "1.2rem",
                }}
              >
                ★★★★★ ({product.reviews} reviews)
              </div>
            )}

            <div style={{ marginBottom: "18px" }}>
              <span
                style={{
                  fontSize: "1.9rem",
                  fontWeight: "700",
                  color: "#b42a17",
                }}
              >
                ${product.price}.0
              </span>
              {product.oldPrice && (
                <span
                  style={{
                    marginLeft: "14px",
                    color: "#888",
                    textDecoration: "line-through",
                    fontSize: "1.2rem",
                  }}
                >
                  ${product.oldPrice}.0
                </span>
              )}
            </div>

            {product.desc && (
              <p style={{ marginBottom: "20px", color: "#444" }}>
                {product.desc}
              </p>
            )}

            {/* Quantity + Add to cart */}
            <div
              style={{
                marginBottom: "18px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <strong>Quantity:</strong>
              <button
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                style={{
                  padding: "4px 14px",
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                  backgroundColor: "#ebebeb",
                  fontWeight: "bold",
                  fontSize: "20px",
                  cursor: "pointer",
                  lineHeight: "18px",
                  userSelect: "none",
                }}
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                style={{
                  width: "36px",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                style={{
                  padding: "4px 14px",
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                  backgroundColor: "#ebebeb",
                  fontWeight: "bold",
                  fontSize: "20px",
                  cursor: "pointer",
                  lineHeight: "18px",
                  userSelect: "none",
                }}
              >
                +
              </button>
              <button
                onClick={handleAddToCart}
                style={{
                  backgroundColor: "#d32f2f",
                  color: "#fff",
                  padding: "12px 12px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  cursor: "pointer",
                  border: "none",
                  marginTop: "12px",
                }}
              >
                ADD TO CART
              </button>
            </div>

            {/* Available Colors */}
            {product.colors && (
              <>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Available color:</strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "18px",
                    justifyContent: "center",
                  }}
                >
                  {product.colors.map((color, idx) => (
                    <span
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor: color,
                        width: selectedColor === color ? "28px" : "22px",
                        height: selectedColor === color ? "28px" : "22px",
                        borderRadius: "50%",
                        border:
                          selectedColor === color
                            ? "3px solid #d32f2f"
                            : "2px solid #fff",
                        boxShadow:
                          selectedColor === color
                            ? "0 0 6px 2px #d32f2f"
                            : "0 0 0 1px #ddd",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Available Sizes */}
            {product.sizes && (
              <>
                <div style={{ marginBottom: "6px" }}>
                  <strong>Available size:</strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {product.sizes.map((size) => (
                    <div
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: "7px 15px",
                        borderRadius: "14px",
                        backgroundColor:
                          selectedSize === size ? "#d32f2f" : "#eee",
                        color: selectedSize === size ? "#fff" : "#333",
                        fontWeight: "bold",
                        cursor: "pointer",
                        userSelect: "none",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </>
            )}

            <div
              style={{ marginTop: "18px", color: "#888", fontWeight: "bold" }}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>
        </div>

        {/* Animation CSS */}
        <style>{`
          .fade-in { opacity: 1; transition: opacity 0.3s ease-in; }
          .fade-out { opacity: 0; transition: opacity 0.3s ease-out; }
        `}</style>
        {showSuccessModal && (
          <SuccessModal
            show={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            productName={product.productName}
          />
        )}
      </div>

      {/* Related Products */}
      <DisplayProduct
        header="RELATED PRODUCTS"
        category={product.type}
        count={4}
      />
      <LinksImg />
    </>
  );
};

export default ProductDetail;
