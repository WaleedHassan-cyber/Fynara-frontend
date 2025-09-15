import React, { useState, useEffect } from "react";

const CartPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
const user = JSON.parse(localStorage.getItem("user:detail"));
const userId = user?.id;   // optional chaining -> agar user null ho to crash na ho


  const [products, setProducts] = useState([]);

  // Fetch cart from backend 
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
            img:
              item.productId?.images?.[0]?.url ||
              "https://via.placeholder.com/80",
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

  // Toggle select
  const toggleSelect = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  // Update cart (backend call)
  const updateCart = async () => {
    try {
      const itemsToUpdate = products
        .filter((p) => p.selected)
        .map((p) => ({
          id: p.id,
          quantity: p.quantity,
          selectedColor: p.selectedColor,
          selectedSize: p.selectedSize,
          price: p.price,
        }));

      const res = await fetch(`${API_URL}/api/cart/update/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsToUpdate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      alert("✅ Cart updated!");
      setProducts((prev) =>
        prev.map((p) =>
          p.selected
            ? {
                ...p,
                quantity:
                  itemsToUpdate.find((i) => i.id === p.id)?.quantity ||
                  p.quantity,
              }
            : p
        )
      );
    } catch (err) {
      console.error("Update cart failed:", err);
      alert(err.message);
    }
  };

  // Delete unselected
  const deleteUnselected = async () => {
    try {
      const keepIds = products.filter((p) => p.selected).map((p) => p.id);

      const res = await fetch(
        `${API_URL}/api/cart/delete/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keepIds }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      alert("🗑️ Unselected items deleted!");
      setProducts((prev) => prev.filter((p) => p.selected));
    } catch (err) {
      console.error("Delete unselected failed:", err);
      alert(err.message);
    }
  };

  // Increment / Decrement
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

  // Subtotal
  const subtotal = products
    .filter((p) => p.selected)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  // --- UI with same styles ---
  const styles = {
    cartContainer: {
      display: "flex",
      gap: "40px",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
    },
    cartItems: {
      flex: 2,
      background: "white",
      border: "1px solid #ddd",
      padding: "30px",
      boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
      borderRadius: "8px",
    },
    cartTable: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    cartThTd: {
      padding: "15px 10px",
      borderBottom: "1px solid #eee",
      textAlign: "left",
      fontWeight: 600,
      color: "#555",
    },
    cartTh: {
      background: "#f8f8f8",
    },
    productInfo: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      fontWeight: 700,
      color: "#222",
    },
    productImg: {
      width: "80px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "6px",
      border: "1px solid #ddd",
    },
    quantityControl: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    quantityButton: {
      background: "#eee",
      border: "1px solid #ccc",
      padding: "6px 12px",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "background 0.3s ease",
    },
    quantityInput: {
      width: "50px",
      padding: "6px",
      textAlign: "center",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    couponSection: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    couponInput: {
      flexGrow: 1,
      padding: "10px 15px",
      borderRadius: "25px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    btnPrimary: {
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none",
      padding: "10px 25px",
      borderRadius: "25px",
      cursor: "pointer",
      fontWeight: 600,
      transition: "background 0.3s ease",
    },
    btnSecondary: {
      backgroundColor: "#f3f4f6",
      border: "none",
      padding: "10px 25px",
      borderRadius: "25px",
      cursor: "pointer",
      fontWeight: 600,
      color: "#555",
      transition: "background 0.3s ease",
    },
    btnDanger: {
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      padding: "10px 25px",
      borderRadius: "25px",
      cursor: "pointer",
      fontWeight: 600,
      marginLeft: "10px",
      transition: "background 0.3s ease",
    },
    cartTotals: {
      flex: 1,
      background: "white",
      border: "1px solid #ddd",
      padding: "30px",
      boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
      borderRadius: "8px",
      fontWeight: 600,
      color: "#333",
    },
    cartTotalsH2: {
      fontSize: "24px",
      marginBottom: "20px",
      color: "#111",
    },
    totalsRow: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "18px",
      marginBottom: "20px",
      borderBottom: "1px solid #ddd",
      paddingBottom: "10px",
    },
    shippingInfo: {
      fontSize: "12px",
      marginBottom: "20px",
      lineHeight: 1.4,
      color: "#666",
    },
    shippingFormLabel: {
      fontWeight: 700,
      marginBottom: "8px",
      display: "block",
    },
    shippingFormInput: {
      width: "100%",
      padding: "10px 15px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "16px",
      color: "#333",
    },
    shippingFormButton: {
      width: "100%",
      padding: "12px 0",
      backgroundColor: "#4f46e5",
      border: "none",
      borderRadius: "25px",
      color: "white",
      fontWeight: 700,
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    checkboxCell: {
      textAlign: "center",
      padding: "15px 10px",
    },
    unselected: {
      opacity: 0.5,
      textDecoration: "line-through",
    },
  };

  return (
    <div style={styles.cartContainer}>
      <div style={styles.cartItems}>
        <table style={styles.cartTable}>
          <thead>
            <tr>
              <th style={{ ...styles.cartThTd, ...styles.cartTh }}></th>
              <th style={{ ...styles.cartThTd, ...styles.cartTh }}>PRODUCT</th>
              <th style={{ ...styles.cartThTd, ...styles.cartTh }}>PRICE</th>
              <th style={{ ...styles.cartThTd, ...styles.cartTh }}>QUANTITY</th>
              <th style={{ ...styles.cartThTd, ...styles.cartTh }}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                style={product.selected ? {} : styles.unselected}
              >
                <td style={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={product.selected}
                    onChange={() => toggleSelect(product.id)}
                  />
                </td>
                <td style={{ ...styles.cartThTd, ...styles.productInfo }}>
                  <img
                    src={product.img}
                    alt={product.title}
                    style={styles.productImg}
                  />
                  {product.title}
                  <br />
                  <small>
                    {product.selectedColor} / {product.selectedSize}
                  </small>
                </td>
                <td style={styles.cartThTd}>${product.price.toFixed(2)}</td>
                <td style={styles.cartThTd}>
                  <div style={styles.quantityControl}>
                    <button
                      style={styles.quantityButton}
                      onClick={() => decrementQuantity(product.id)}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product.id, e.target.value)
                      }
                      style={styles.quantityInput}
                    />
                    <button
                      style={styles.quantityButton}
                      onClick={() => incrementQuantity(product.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td style={styles.cartThTd}>
                  ${(product.price * product.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.couponSection}>
          <button style={styles.btnPrimary} onClick={updateCart}>
            Update Cart
          </button>
          <button style={styles.btnDanger} onClick={deleteUnselected}>
            Delete Unselected
          </button>
        </div>
      </div>

      <div style={styles.cartTotals}>
        <h2 style={styles.cartTotalsH2}>CART TOTALS</h2>
        <div style={styles.totalsRow}>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="shippingInfo">
          <p>There are no shipping methods available.</p>
          <p>Please double check your address, or contact us if you need any help.</p>
        </div>
        <div>
          <label style={styles.shippingFormLabel}>Calculate Shipping</label>
          <select style={styles.shippingFormInput}>
            <option>Select a country...</option>
            <option>USA</option>
            <option>Canada</option>
            <option>UK</option>
          </select>
          <input type="text" placeholder="State / country" style={styles.shippingFormInput} />
          <input type="text" placeholder="Postcode / Zip" style={styles.shippingFormInput} />
          <input type="text" placeholder="Address (Area / House No. / Street No./)" style={styles.shippingFormInput} />
          <button style={styles.shippingFormButton}>Update Totals</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
