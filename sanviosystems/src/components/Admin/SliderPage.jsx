import React, { useState, useEffect } from "react";
import axios from "axios";

const SliderPage = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get("http://localhost:5000/api/slider");
    setSliderImages(res.data);
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    await axios.post("http://localhost:5000/api/slider/upload", formData);
    setImage(null);
    fetchImages(); // refresh
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/slider/${id}`);
    fetchImages();
  };

  return (
    <div>
      <h2>Upload Slider Image</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {sliderImages.map((img) => (
          <div key={img._id}>
            <img src={`http://localhost:5000${img.imageUrl}`} width="150" />
            <button onClick={() => handleDelete(img._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderPage;
