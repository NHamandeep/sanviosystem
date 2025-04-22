import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const email = localStorage.getItem("resetEmail");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:5000/api/reset-password", {
        email,
        newPassword: password,
      });
      alert("Password updated!");
      navigate("/login");
    } catch (err) {
      alert("Error resetting password");
    }
  };

  return (
    <div className="card">
      <h2>Set New Password</h2>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
