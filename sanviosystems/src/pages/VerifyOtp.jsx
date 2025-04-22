import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleVerify = async () => {
    try {
      await axios.post("http://localhost:5000/api/verify-otp", { email, otp });
      navigate("/reset-password");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="card">
      <h2>Enter OTP</h2>
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
};

export default VerifyOtp;
