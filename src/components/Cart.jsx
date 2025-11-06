import React, { useState, useEffect } from "react";
import "./Cart.css";

const CartPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user:detail"));
  const userId = user?.id;
  const [products, setProducts] = useState([]);
  const [orderForm, setOrderForm] = useState({
    OAddress: "",
    OTehsil: "",
    OPostCode: "",
  });

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cart/${userId}`);
        const data = await res.json();
        if (data.cartItems) {
          const mapped = data.cartItems.map((item) => ({
            id: item._id, // ✅ cart item ka id (sirf frontend ke liye)
            productId: item.productId?._id || item.productId, // ✅ actual product id
            title: item.productId?.productName || "Unknown Product",
            price: item.price,
            quantity: item.quantity,
            img:
              item.productId?.images?.[0]?.url ||
              "https://via.placeholder.com/80",
            selected: true,
            selectedColor: item.selectedColor,
            selectedSize: item.selectedSize,
          }));
          console.log("Fetched cart items:", mapped);
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
      // ✅ Local storage update karo
      console.log("Delete from cart response:", data);
      let user = JSON.parse(localStorage.getItem("user:detail"));
      if (user) {
        user.cartCount = data.cartCount; // update cart count from backend
        localStorage.setItem("user:detail", JSON.stringify(user));
      }
      setProducts((prev) => prev.filter((p) => keepIds.includes(p.id)));
      window.dispatchEvent(new Event("cartUpdated"));
      return {
        success: true,
        cartItems: data.cartItems,
        cartCount: data.cartCount,
      };
    } catch (error) {
      console.error("Delete cart error:", error);
      return { success: false, message: error.message };
    }
  };

  // 🚀 Place Order Handler
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please login first!");

    // sirf selected products bhejne hain
   const orderProducts = products
  .filter((p) => p.selected)
  .map((p) => ({
    product: p.productId, // ✅ yahan actual product id
    quantity: p.quantity,
    selectedSize: p.selectedSize,
    selectedColor: p.selectedColor,
  }));

    // console.log("Order Products:", orderProducts, "Order Form:", orderForm);

    if (orderProducts.length === 0)
      return alert("Please select at least one product to place an order.");

    try {
      const res = await fetch(`${API_URL}/api/orders/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: orderProducts,
          ...orderForm,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to place order");

      console.log("Order placed successfully:", data);

      alert("🎉 Order placed successfully!");
      // optionally cart empty kar do
      setProducts([]);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Order error:", error);
      alert("❌ Failed to place order: " + error.message);
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
                    <button onClick={() => decrementQuantity(product.id)}>
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product.id, e.target.value)
                      }
                    />
                    <button onClick={() => incrementQuantity(product.id)}>
                      +
                    </button>
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
            Please double check your address, or contact us if you need any
            help.
          </p>
        </div>
        <div className="cartpage-shipping-form">
          <form>
            <label>Calculate Shipping</label>
            <select>
              <option>Pakistan</option>
            </select>
            <input
              type="text"
              name="OAddress"
              placeholder="Address (Area / House No./ Street)"
              value={orderForm.OAddress}
              onChange={(e) =>
                setOrderForm({ ...orderForm, OAddress: e.target.value })
              }
            />
            <input
              type="text"
              name="OTehsil"
              placeholder="Tehsil (eg. Lahore Cantt)"
              value={orderForm.OTehsil}
              onChange={(e) =>
                setOrderForm({ ...orderForm, OTehsil: e.target.value })
              }
            />
            <input
              type="text"
              name="OPostCode"
              placeholder="Postcode / Zip"
              value={orderForm.OPostCode}
              onChange={(e) =>
                setOrderForm({ ...orderForm, OPostCode: e.target.value })
              }
            />
            <button type="submit" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
