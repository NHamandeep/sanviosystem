import React, { useEffect, useState } from "react";
import "./PopularProducts.css";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/popular-products");
    const data = await res.json();
    const updated = data.map((p) => ({
      ...p,
      imageUrl: "http://localhost:5000" + p.imageUrl,
    }));
    setProducts(updated);
  };

  const handleBuyNow = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const updatedCart = [
      ...existingCart,
      {
        ...product,
        brand: product.title,
        model: product.title,
        quantity: 1,
        img: product.imageUrl.startsWith("http")
          ? product.imageUrl
          : "http://localhost:5000" + product.imageUrl, // 👈 Full image path
      },
    ];
  
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Product added to cart!");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="popular-products-section">
      <h2 className="section-title">Popular Products</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <img src={p.imageUrl} alt={p.title} className="product-image" />
            <div className="product-info">
              <h4 className="product-title">{p.title}</h4>
              <p className="product-price">₹ {p.price}</p>
               {/* ⭐ Star Rating */}
  <div className="star-rating">
    {[...Array(5)].map((_, i) => (
      <span key={i} className="star">★</span>
    ))}
  </div>
              <button className="buy-button" onClick={() => handleBuyNow(p)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
