import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email || !newPassword) return alert("Please enter email and new password.");

    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password", {
        email,
        newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        
         <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleResetPassword} style={styles.button}>
          Set Password
        </button>
        {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
        <p style={styles.link} onClick={() => navigate("/login")}>🔙 Back to Login</p>
      </div>
    </div>
  );
};

export default ForgotPassword;

const styles = {
  container: {
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f0f0",
  },
  card: {
    padding: "30px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4a3aff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  link: {
    marginTop: "15px",
    color: "#4a3aff",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "underline",
  },
};
