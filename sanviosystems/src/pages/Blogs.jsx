import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlog, setExpandedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  const handleReadMore = (blog) => {
    setExpandedBlog(blog);
  };

  const handleReadLess = () => {
    setExpandedBlog(null);
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Our Blogs</h2>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {expandedBlog ? (
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              overflow: "hidden",
              padding: "20px",
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${expandedBlog.image}`}
              alt="blog"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            />
            <h2 style={{ marginBottom: "15px", color: "#222" }}>{expandedBlog.title}</h2>

            {/* ✅ HTML rendering safely */}
            <div
              style={{ fontSize: "1rem", color: "#444", lineHeight: "1.6" }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(expandedBlog.description),
              }}
            />

            <button
              onClick={handleReadLess}
              style={{
                marginTop: "20px",
                padding: "10px 16px",
                fontSize: "16px",
                backgroundColor: "#ff5e57",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Read Less
            </button>
          </div>
        ) : (
          blogs.map((blog) => {
            const shortDesc = stripHtml(blog.description).slice(0, 100);

            return (
              <div
                key={blog._id}
                style={{
                  width: "300px",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  transition: "transform 0.3s",
                }}
              >
                <img
                  src={`http://localhost:5000/uploads/${blog.image}`}
                  alt="blog"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div style={{ padding: "15px" }}>
                  <h3 style={{ marginBottom: "10px", fontSize: "1.2rem", color: "#222" }}>
                    {blog.title}
                  </h3>
                  <p style={{ color: "#555", fontSize: "0.95rem" }}>{shortDesc}...</p>
                  <button
                    onClick={() => handleReadMore(blog)}
                    style={{
                      marginTop: "10px",
                      padding: "8px 12px",
                      fontSize: "14px",
                      border: "none",
                      borderRadius: "6px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Blogs;
