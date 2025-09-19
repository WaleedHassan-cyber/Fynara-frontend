import React, { useState, useEffect } from "react";
import "./Cart.css";

const CartPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user:detail"));
  const userId = user?.id;

  const [products, setProducts] = useState([]);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cart/${userId}`);
        const data = await res.json();
        if (data.cartItems) {
          const mapped = data.cartItems.map((item) => ({
            id: item._id,
            title: item.productId?.productName || "Unknown Product",
            price: item.price,
            quantity: item.quantity,
            img: item.productId?.images?.[0]?.url || "https://via.placeholder.com/80",
            selected: true,
            selectedColor: item.selectedColor,
            selectedSize: item.selectedSize,
          }));
          setProducts(mapped);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [API_URL, userId]);

  // toggle
  const toggleSelect = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  // qty controls
  const incrementQuantity = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };
  const decrementQuantity = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };
  const updateQuantity = (id, value) => {
    const q = parseInt(value);
    if (isNaN(q) || q < 1) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: q } : p))
    );
  };

  // subtotal
  const subtotal = products
    .filter((p) => p.selected)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 🚀 Delete Unselected Items (API call)
  const handleDeleteUnselected = async () => {
    if (!userId) return alert("Please login first!");

    const keepIds = products.filter((p) => p.selected).map((p) => p.id);

    try {
      const res = await fetch(`${API_URL}/api/cart/delete/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keepIds }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete");

      alert("✅ Unselected items deleted successfully!");
      // frontend state update
      setProducts((prev) => prev.filter((p) => keepIds.includes(p.id)));
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ " + error.message);
    }
  };

  return (
    <div className="cartpage-container">
      <div className="cartpage-items">
        <table className="cartpage-table">
          <thead>
            <tr>
              <th></th>
              <th>PRODUCT</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className={product.selected ? "" : "cartpage-unselected"}
              >
                <td className="cartpage-checkbox-cell">
                  <input
                    type="checkbox"
                    checked={product.selected}
                    onChange={() => toggleSelect(product.id)}
                  />
                </td>
                <td className="cartpage-product-info">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="cartpage-product-img"
                  />
                  <div>
                    {product.title}
                    <br />
                    <small>
                      {product.selectedColor} / {product.selectedSize}
                    </small>
                  </div>
                </td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <div className="cartpage-quantity-control">
                    <button onClick={() => decrementQuantity(product.id)}>−</button>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) => updateQuantity(product.id, e.target.value)}
                    />
                    <button onClick={() => incrementQuantity(product.id)}>+</button>
                  </div>
                </td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cartpage-coupon-section">
          <button className="cartpage-btn-primary">Update Cart</button>
          <button
            className="cartpage-btn-danger"
            onClick={handleDeleteUnselected}
          >
            Delete Unselected
          </button>
        </div>
      </div>

      <div className="cartpage-totals">
        <h2>CART TOTALS</h2>
        <div className="cartpage-totals-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="cartpage-shipping-info">
          <p>There are no shipping methods available.</p>
          <p>
            Please double check your address, or contact us if you need any help.
          </p>
        </div>
        <div className="cartpage-shipping-form">
          <label>Calculate Shipping</label>
          <select>
            <option>Select a country...</option>
            <option>USA</option>
            <option>Canada</option>
            <option>UK</option>
          </select>
          <input type="text" placeholder="State / country" />
          <input type="text" placeholder="Postcode / Zip" />
          <input type="text" placeholder="Address (Area / House No./ Street)" />
          <button>Update Totals</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
