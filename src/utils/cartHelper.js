// cartHelpers.js
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

    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to add to cart");

    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};
