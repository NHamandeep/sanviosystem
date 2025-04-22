import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import popularProductRoutes from "./routes/popularProducts.js"; // ✅ Important

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // image access ke liye

// ✅ Popular products route use karo
app.use("/api/popular-products", popularProductRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/moveonsolution")
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log("MongoDB Error:", err));
