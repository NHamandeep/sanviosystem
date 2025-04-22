import React, { useState, useEffect } from "react";

const AddCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleBuyNow = (product) => {
    alert(`Buying ${product.brand || product.name} for ₹${product.price}`);
  };

  const handleIncreaseQty = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleDecreaseQty = (index) => {
    const updatedCart = [...cart];
    if ((updatedCart[index].quantity || 1) <= 1) {
      handleRemoveFromCart(index);
    } else {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      updateLocalStorage(updatedCart);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Cart</h2>
      {cart.length === 0 ? (
        <p style={styles.emptyCart}>Cart is empty</p>
      ) : (
        <div style={styles.cartGrid}>
          {cart.map((product, index) => (
            <div key={index} style={styles.cartCard}>
              <img
                src={
                  product.img?.startsWith("http")
                    ? product.img
                    : product.image?.startsWith("http")
                    ? product.image
                    : product.img
                    ? `http://localhost:5000/uploads/${product.img}`
                    : product.image
                    ? `http://localhost:5000/uploads/${product.image}`
                    : "https://via.placeholder.com/100x100.png?text=No+Image"
                }
                alt={product.brand || product.name}
                style={styles.cartImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/100x100.png?text=No+Image";
                }}
              />

              <div style={styles.cartDetails}>
                <h3>{product.brand || product.name}</h3>
                <p>{product.model}</p>
                <p style={styles.price}>
                  ₹ {product.price} × {product.quantity || 1} = ₹{" "}
                  {(product.price * (product.quantity || 1)).toFixed(2)}
                </p>

                <div style={styles.qtyRow}>
                  <button
                    onClick={() => handleDecreaseQty(index)}
                    style={styles.qtyButton}
                  >
                    −
                  </button>
                  <span style={styles.qtyText}>{product.quantity || 1}</span>
                  <button
                    onClick={() => handleIncreaseQty(index)}
                    style={styles.qtyButton}
                  >
                    +
                  </button>
                </div>

                <div style={styles.buttonContainer}>
                  <button
                    onClick={() => handleRemoveFromCart(index)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    style={styles.buyButton}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  emptyCart: {
    fontSize: "18px",
    color: "#888",
  },
  cartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  cartCard: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  cartImage: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    padding: "5px",
    marginRight: "15px",
  },
  cartDetails: {
    textAlign: "left",
    flexGrow: 1,
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#007BFF",
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    gap: "10px",
  },
  qtyButton: {
    padding: "6px 12px",
    fontSize: "18px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    background: "#f0f0f0",
    cursor: "pointer",
  },
  qtyText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  removeButton: {
    background: "#ff4d4d",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buyButton: {
    background: "#28a745",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AddCart;
