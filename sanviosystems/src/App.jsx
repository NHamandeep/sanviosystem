import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Addcart from "./components/Addcart";
import CardsDis from "./components/CardsDis";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";

// 👇 New imports for product pages
import ProductPage from "./components/Admin/ProductPage";
import VerifyOtp from "./pages/VerifyOtp";
import ProductsPg from "./components/ProductsPg";
import WhatsAppButton from "./components/WhatsAppButton";


function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/AdminDashboard");

  // 👇 Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 👇 Protect admin route
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Navbar />
      {!isAdminPage && <WhatsAppButton />}
      
      {location.pathname === "/" && <Slider />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
        {/* <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} /> */}

        {/* 👇 Protected Admin Dashboard */}
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/Addcart" element={<Addcart />} />
        <Route path="/product-details" element={<CardsDis />} />
        <Route path="/add-product" element={<ProductPage />} />
        <Route path="/products-list" element={<ProductsPg />} />
        
      </Routes>

      {!isAdminPage && <Footer />}
     
    </>
  );
}

export default App;
