// import React from "react";
// import "./ProductCard.css";

// const ProductCard = ({ product }) => {
//   return (
//     <div className="product-card">
      
//       <img src={product.image} alt={product.name} className="product-image" />
//       <h3 className="product-name">{product.name}</h3>
//       <p className="product-price">${product.price}</p>
//       <button className="buy-now">Buy now</button>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const handleBuyNow = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists in cart
    const existingIndex = existingCart.findIndex((item) => item.id === product.id);
    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity = (existingCart[existingIndex].quantity || 1) + 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated")); // 🔥 Trigger cart update globally
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <button className="buy-now" onClick={handleBuyNow}>
        Buy now
      </button>
    </div>
  );
};

export default ProductCard;
