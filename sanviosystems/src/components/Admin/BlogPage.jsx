import { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc); // HTML from ReactQuill
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/blogs", formData);
      alert("Blog posted!");
      setTitle("");
      setDesc("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Blog post failed!");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Post a New Blog</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <ReactQuill
            value={desc}
            onChange={setDesc}
            theme="snow"
            style={styles.quill}
            placeholder="Write your blog content here..."
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={styles.fileInput}
            accept="image/*"
          />
          <button type="submit" style={styles.button}>Post Blog</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "800px",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  quill: {
    height: "250px",
    marginBottom: "20px",
  },
  fileInput: {
    fontSize: "16px",
  },
  button: {
    padding: "14px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default BlogPage;
