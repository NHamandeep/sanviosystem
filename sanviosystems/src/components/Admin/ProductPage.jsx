import React, { useState } from "react";
import axios from "axios";

const ProductPage = () => {
  const [data, setData] = useState({ brand: "", price: "" });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", file);
    formData.append("brand", data.brand);
    formData.append("price", data.price);

    try {
      await axios.post("http://localhost:5000/api/products", formData);
      alert("Product added!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Add Product</h2>
      <input type="text" name="brand" placeholder="Brand" onChange={handleChange} required style={styles.input} />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} required style={styles.input} />
      <input type="file" name="img" onChange={handleFileChange} required style={styles.input} />
      <button type="submit" style={styles.button}>Add Product</button>
    </form>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }
};

export default ProductPage; // ✅ This is important!
