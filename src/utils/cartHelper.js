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
    console.log("Add to cart response:", data);
    // ✅ Local storage update karo
    let user = JSON.parse(localStorage.getItem("user:detail"));
    if (user) {
      user.cartCount = data.cartCount; // update cart count
      localStorage.setItem("user:detail", JSON.stringify(user));
    }
     window.dispatchEvent(new Event("cartUpdated"));
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};
export const deleteFromCart = async ({ userId, keepIds }) => {
  
};

