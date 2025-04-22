// backend_final/controllers/sliderController.js
import Slider from "../models/Slider.js";
import fs from "fs";

// Upload Image & Save to DB
export const uploadSliderImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newSlider = new Slider({ filename: req.file.filename });
    await newSlider.save();

    res.status(201).json({ message: "Image uploaded", filename: req.file.filename });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Slider Images
export const getSliderImages = async (req, res) => {
  try {
    const images = await Slider.find().sort({ uploadedAt: -1 });
    const filenames = images.map((img) => img.filename);
    res.json(filenames);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
