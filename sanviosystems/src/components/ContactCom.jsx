import React, { useState } from "react";
import axios from "axios";

const ContactCom = () => {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [animateFormOut, setAnimateFormOut] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phone = form.contact.trim();
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit contact number.");
      return;
    }

    setAnimateFormOut(true);

    setTimeout(async () => {
      try {
        await axios.post("http://localhost:5000/api/contact", form);
        setSubmitted(true);
        setForm({ name: "", contact: "", email: "", message: "" });
      } catch (error) {
        alert("Failed to send message.");
        console.error(error);
      }
    }, 700);
  };

  return (
    <div
      style={{
      
      
        background: "linear-gradient(135deg, #283048, #859398)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "100px 20px 40px",
      }}
    >
      <div
        style={{
          perspective: "1200px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className={`form-card ${animateFormOut ? "flip-out" : ""}`}
            style={{
              backgroundColor: "#fff",
              padding: "40px",
              borderRadius: "15px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              transformStyle: "preserve-3d",
              transition: "transform 0.7s ease-in-out",
            }}
          >
            <h2 style={{ textAlign: "center", color: "#333" }}>Contact Us</h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              required
              style={inputStyle}
            />
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Your Contact No"
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              style={inputStyle}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message..."
              rows="5"
              required
              style={inputStyle}
            ></textarea>
            <button type="submit" style={buttonStyle}>
              Send Message
            </button>
          </form>
        ) : (
          <div
            style={{
              backgroundColor: "#fff",
              padding: "50px 30px",
              borderRadius: "15px",
              textAlign: "center",
              animation: "fadeIn 1s ease forwards",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              transform: "rotateY(0deg)",
            }}
          >
            <div style={{ fontSize: "3rem" }}>😊</div>
            <h2 style={{ color: "#333", marginTop: "10px" }}>Thank You!</h2>
            <p style={{ color: "#555", marginTop: "10px", fontSize: "1.1rem" }}>
              Your message has been sent successfully. <br />
              We'll get back to you as soon as possible.
            </p>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        .flip-out {
          transform: rotateY(90deg);
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  padding: "15px",
  backgroundColor: "#e63946",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "1.1rem",
  cursor: "pointer",
};

export default ContactCom;
