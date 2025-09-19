// cartHelpers.js
const API_URL = import.meta.env.VITE_API_URL;

export const addToCart = async ({ userId, product, quantity = 1, selectedColor, selectedSize }) => {
  try {
    const payload = {
      userId,
      productId: product._id,
      quantity,
      selectedColor: selectedColor || product.colors?.[0] || "default",
      selectedSize: selectedSize || product.sizes?.[0] || "default",
      price: product.price,
    };

    const res = await fetch(`${API_URL}/api/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add to cart");

    // ✅ Local storage update karo
    let user = JSON.parse(localStorage.getItem("user:detail"));
    if (user) {
      user.cartCount = data.cartItems.length; // update cart count
      localStorage.setItem("user:detail", JSON.stringify(user));
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};
export const deleteFromCart = async ({ userId, keepIds }) => {
  try {
    const res = await fetch(`${API_URL}/api/cart/delete/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keepIds }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete");

    return { success: true, cartItems: data.cartItems };
  } catch (error) {
    console.error("Delete cart error:", error);
    return { success: false, message: error.message };
  }
};
