import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.jpg";
import { FaCartPlus, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

    const handleCartUpdate = () => updateCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="SanvioSystems Logo" className="logo-img" />
          SANVIO SYSTEMS
        </Link>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
  <li><Link to="/" className="nav-item">Home</Link></li>
  <li><Link to="/about" className="nav-item">About</Link></li>
  <li><Link to="/products" className="nav-item">Products</Link></li>
  <li><Link to="/blogs" className="nav-item">Blogs</Link></li>
  <li><Link to="/contact" className="nav-item">Contact</Link></li>
</ul>


        <div className="nav-top-icons">
          {/* Cart Icon */}
          <Link to="/Addcart" className="nav-icon" style={{ position: "relative" }}>
  <FaCartPlus />
  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
</Link>

          {/* Menu Toggle Icon */}
          <div className="menu-icon" onClick={toggleMenu}>
            <div className={`menu-toggle ${menuOpen ? "open" : ""}`}>
              {menuOpen ? <IoClose size={28} /> : <HiMenuAlt3 size={28} />}
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="social-icon" /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="social-icon" /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="social-icon" /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube className="social-icon" /></a>
          <a href="tel:+9815901342"><FiPhone className="social-icon" /></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
