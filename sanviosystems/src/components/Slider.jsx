import React, { useEffect, useState } from "react";
import axios from "axios";

const Slider = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch images from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/slider")
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return <div>Loading...</div>;

  return (
    <div style={styles.sliderWrapper}>
      <div style={styles.sliderContainer}>
        {images.map((img, index) => (
          <div
            key={img._id}
            style={{
              ...styles.slide,
              opacity: index === current ? 1 : 0,
            }}
          >
            <img
              src={`http://localhost:5000${img.imageUrl}`}
              alt="slider"
              style={styles.slideImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  sliderWrapper: {
    paddingTop: "60px", // Same as navbar height to prevent overlap
    width: "100%",
  },
  sliderContainer: {
    position: "relative",
    width: "100%",
    height: "0",
    paddingBottom: "40%", // Aspect ratio (adjust as needed)
    overflow: "hidden",
  },
  slide: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transition: "opacity 1s ease-in-out",
  },
  slideImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default Slider;