import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { color } from "framer-motion";

const ProductsPg = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [hovered, setHovered] = useState(null); // ⭐ Hover state

  useEffect(() => {
    fetchProducts();
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Product Added to Cart!");
  };

  const renderStars = (rating) => {
    const filled = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - filled - (half ? 1 : 0);

    return (
      <span style={{ color: "#f7c948", fontSize: "18px" }}>
        {"★".repeat(filled)}
        {half && "☆"}
        {"✩".repeat(empty)}
        &nbsp;({rating.toFixed(1)})
      </span>
    );
  };

  return (
    <div style={styles.container}>
      <Toaster />
      <div style={styles.topBar}>
        <h2 style={styles.heading}>Our Latest Products</h2>
        <button onClick={() => navigate("/Addcart")} style={styles.cartButton}>
          🛒 Cart ({cart.length})
        </button>
      </div>

      <div style={styles.gridContainer}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              ...styles.card,
              ...(hovered === product._id ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHovered(product._id)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={`http://localhost:5000/uploads/${product.img}`}
              alt={product.brand}
              style={styles.image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/200x200.png?text=No+Image";
              }}
            />
            <div style={styles.details}>
              <h3 style={styles.brand}>{product.brand}</h3>
              <h1 style={styles.price}>₹ {product.price}</h1>
              <div style={styles.rating}>
                {renderStars(product.rating || 4.5)}
              </div>
              <button
                style={styles.addToCart}
                onClick={() => handleAddToCart(product)}
              >
                + Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    backgroundImage: "url('/background-3.jpg')", // ✅ Your image path
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    color: "#fff",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  heading: {
    margin: 0,
    fontSize: "24px",
    color: "#333",
  },
  cartButton: {
    background: "#007bff",
    color: "white",
    padding: "10px 18px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "6px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "25px",
  },
  card: {
    backgroundColor: "#f0e9e9",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s",
    cursor: "pointer",
  },
  cardHover: {
    transform: "scale(1.03)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    backgroundColor: "#eef7ff",
    border: "1px solid rgb(255, 0, 0)",
  },
  image: {
    width: "100%",
    height: "220px", 
    objectFit: "contain", 
    borderBottom: "1px solid #eee",
    backgroundColor: "#fff", 
    padding: "10px", 
  },
  
  details: {
    padding: "15px",
    textAlign: "center",
  },
  brand: {
    fontSize: "18px",
    margin: "10px 0 5px 0",
    color: "#222",
  },
  price: {
    fontSize: "16px",
    color: "#28a745",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  rating: {
    marginBottom: "12px",
  },
  addToCart: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default ProductsPg;
