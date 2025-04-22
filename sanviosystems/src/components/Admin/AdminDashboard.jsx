import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt, FaImages, FaBox, FaEnvelope,
  FaShoppingCart, FaBloggerB,
} from "react-icons/fa";
import axios from "axios";

// Pages
import DashboardPage from "./DashboardPage";
import BlogPage from "./BlogPage";
import SliderPage from "./SliderPage";
import ProductPage from "./ProductPage";
import Popular_Products from "./Popular_Products";
import EmailPage from "./EmailPage";
import OrderPage from "./OrderPage";
import ContactPage from "./ContactPage";

const AdminDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [contactCount, setContactCount] = useState(0);
  const navigate = useNavigate();

  // ✅ Check for token (auth)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    fetchContactCount();
  }, []);

  const fetchContactCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setContactCount(res.data.length);
    } catch (error) {
      console.error("Failed to fetch contact count:", error);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Blog", icon: <FaBloggerB /> },
    { name: "Slider", icon: <FaImages /> },
    {
      name: "Product", icon: <FaBox />, subItems: [
        { name: "All Product" },
        { name: "Popular_Products" },
      ]
    },
    { name: "Email", icon: <FaEnvelope /> },
    { name: "Order", icon: <FaShoppingCart /> },
    { name: "Contact", icon: <FaShoppingCart /> },
  ];

  const renderPage = () => {
    switch (active) {
      case "Dashboard": return <DashboardPage />;
      case "Blog": return <BlogPage />;
      case "Slider": return <SliderPage />;
      case "All Product": return <ProductPage />;
      case "Popular_Products": return <Popular_Products />;
      case "Email": return <EmailPage />;
      case "Order": return <OrderPage />;
      case "Contact": return <ContactPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <div
                className={active === item.name ? "active" : ""}
                onClick={() => {
                  if (item.name === "Product") {
                    setProductDropdownOpen(!productDropdownOpen);
                  } else {
                    setActive(item.name);
                    setProductDropdownOpen(false);
                    if (item.name === "Contact") {
                      setContactCount(0);
                    }
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.name === "Contact" && contactCount > 0 && (
                  <span
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 8px",
                      fontSize: "12px",
                      position: "absolute",
                      right: "10px",
                    }}
                  >
                    {contactCount}
                  </span>
                )}
              </div>

              {item.subItems && productDropdownOpen && item.name === "Product" && (
                <ul style={{ paddingLeft: "20px" }}>
                  {item.subItems.map((sub) => (
                    <li
                      key={sub.name}
                      className={active === sub.name ? "active" : ""}
                      onClick={() => setActive(sub.name)}
                      style={{
                        padding: "5px 0",
                        cursor: "pointer",
                        color: "#ddd"
                      }}
                    >
                      - {sub.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
      <main className="content">{renderPage()}</main>
    </div>
  );
};

export default AdminDashboard;

// ✅ Restore design styles
const styles = `
.dashboard-container {
  display: flex;
  height: calc(100vh - 60px);
  margin-top: 60px;
  height: auto;
}
.sidebar {
  width: 250px;
  background: #291757;
  color: white;
  padding: 20px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  display: block;
}
.sidebar li .active {
  background: red;
}
.sidebar ul ul {
  list-style: none;
  padding-left: 15px;
  font-size: 14px;
  color: #ddd;
}
.sidebar ul ul li:hover {
  color: #fff;
}
.content {
  flex: 1;
  padding: 20px;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
