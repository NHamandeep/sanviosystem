import { useEffect, useState } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [postedProducts, setPostedProducts] = useState([]);
  const [showBlogs, setShowBlogs] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showPostedProducts, setShowPostedProducts] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/popular-products");
      const updated = res.data.map((p) => ({
        ...p,
        imageUrl: "http://localhost:5000" + p.imageUrl,
      }));
      setProducts(updated);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchPostedProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const updated = res.data.map((p) => ({
        ...p,
        img: `http://localhost:5000/uploads/${p.img}`,
      }));
      setPostedProducts(updated);
    } catch (err) {
      console.error("Error fetching posted products:", err);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/popular-products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleDeletePostedProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchPostedProducts();
    } catch (err) {
      console.error("Error deleting posted product:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchProducts();
    fetchPostedProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#3f51b5" }}>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div
          style={cardStyle("#81d4fa")}
          onClick={() => {
            setShowBlogs(!showBlogs);
            setShowProducts(false);
            setShowPostedProducts(false);
          }}
        >
          <h3 style={{ margin: 0 }}>📚 Our Blog</h3>
        </div>

        <div
          style={cardStyle("#f48fb1")}
          onClick={() => {
            setShowProducts(!showProducts);
            setShowBlogs(false);
            setShowPostedProducts(false);
          }}
        >
          <h3 style={{ margin: 0 }}>🛍️ Popular Product</h3>
        </div>

        <div
          style={cardStyle("#a5d6a7")}
          onClick={() => {
            setShowPostedProducts(!showPostedProducts);
            setShowProducts(false);
            setShowBlogs(false);
          }}
        >
          <h3 style={{ margin: 0 }}>📦 All Products</h3>
        </div>
      </div>

      {showBlogs && (
        <Section title="All Blogs">
          {blogs.map((blog) => (
            <ItemCard
              key={blog._id}
              image={`http://localhost:5000/uploads/${blog.image}`}
              title={blog.title}
              subtitle={blog.description}
              onDelete={() => handleDeleteBlog(blog._id)}
            />
          ))}
        </Section>
      )}

      {showProducts && (
        <Section title="All Popular Products">
          {products.map((product) => (
            <ItemCard
              key={product._id}
              image={product.imageUrl}
              title={product.title}
              subtitle={`Rs. ${product.price}`}
              onDelete={() => handleDeleteProduct(product._id)}
            />
          ))}
        </Section>
      )}

      {showPostedProducts && (
        <Section title="All Products You Posted">
          {postedProducts.map((p) => (
            <ItemCard
              key={p._id}
              image={p.img}
              title={p.brand}
              subtitle={`Rs. ${p.price}`}
              onDelete={() => handleDeletePostedProduct(p._id)}
            />
          ))}
        </Section>
      )}
    </div>
  );
};

// 🔧 Card styles for section buttons
const cardStyle = (bg) => ({
  border: "1px solid #ccc",
  padding: "20px",
  cursor: "pointer",
  borderRadius: "12px",
  backgroundColor: bg,
  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
  minWidth: "180px",
  textAlign: "center",
  transition: "0.3s ease",
});

// 🔧 Section wrapper
const Section = ({ title, children }) => (
  <div>
    <h3
      style={{
        margin: "20px 0",
        color: "#3f51b5",
        fontSize: "26px",
        borderBottom: "2px solid #3f51b5",
        display: "inline-block",
        paddingBottom: "4px",
      }}
    >
      {title}
    </h3>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
      }}
    >
      {children}
    </div>
  </div>
);

// 🎨 Colorful Item Card WITHOUT Edit button
const ItemCard = ({ image, title, subtitle, onDelete }) => (
  <div
    style={{
      borderRadius: "16px",
      overflow: "hidden",
      background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.03)";
      e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.1)";
    }}
  >
    <img
      src={image}
      alt="item"
      style={{ width: "100%", height: "200px", objectFit: "cover" }}
    />
    <div style={{ padding: "16px", backgroundColor: "#fff" }}>
      <h3 style={{ fontSize: "20px", color: "#333", margin: "0 0 10px" }}>
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "15px",
          lineHeight: "1.5",
        }}
      >
        {subtitle.length > 100 ? subtitle.slice(0, 100) + "..." : subtitle}
      </p>
      <div style={{ textAlign: "right" }}>
        <button
          onClick={onDelete}
          style={{
            padding: "6px 14px",
            backgroundColor: "#ff5252",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  </div>
);

export default DashboardPage;
