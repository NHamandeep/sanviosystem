import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password", {
        email,
        newPassword,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Something went wrong!");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center" }}>Reset / Create Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px" }}
        />
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
          Submit
        </button>
      </form>
      {message && <p style={{ marginTop: "15px", color: "green", textAlign: "center" }}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
