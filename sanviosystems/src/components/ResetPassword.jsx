import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();  // Extract token from URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `http://localhost:5000/api/reset-password/${token}`,
        { newPassword }
      );

      if (response.status === 200) {
        setMessage("Password reset successfully.");
      }
    } catch (error) {
      setMessage("Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "300px", margin: "0 auto", padding: "20px" }}>
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />
      <button
        onClick={handleResetPassword}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          width: "100%",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
};

export default ResetPassword;
