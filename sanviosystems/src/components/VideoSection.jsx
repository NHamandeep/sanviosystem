import React, { useState, useEffect } from "react";

const videoIds = [
  "hE9AChJdj8Q",
  "ezP4Nhx_rL0",
  "Jzn8UlxnfoU",
  "SxQzasNzVi8",
];

const VideoCatalogSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onPlayerStateChange = (event) => {
      if (event.data === 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videoIds.length);
      }
    };

    window.onYouTubeIframeAPIReady = function () {
      new window.YT.Player("youtube-player", {
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    container: {
      margin:"0",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      width: "100%",
      height: isMobile ? "auto" : "600px",
      backgroundColor: "#f5dada",
      alignItems: "center",
      justifyContent: "center",
      
      padding: "10px",
    },
    videoContainer: {
      width: isMobile ? "100%" : "60%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
    },
    video: {
      width: "100%",
      height: isMobile ? "40vh" : "50vh",
      borderRadius: "10px",
    },
    catalogContainer: {
      width: isMobile ? "100%" : "40%",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "15px",
    },
    title: {
      marginBottom: "10px",
      fontSize: isMobile ? "1.2rem" : "1.5rem",
      textAlign: "center",
    },
    catalogLink: {
      display: "inline-block",
      marginTop: "10px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "5px",
      fontSize: "1rem",
    },
    qrImage: {
      width: isMobile ? "200px" : "300px",
      height: "auto",
    },
  };

  return (
    <div style={styles.container}>
      {/* Video Section */}
      <div style={styles.videoContainer}>
        <iframe
          id="youtube-player"
          key={currentIndex}
          src={`https://www.youtube.com/embed/${videoIds[currentIndex]}?autoplay=1&mute=1&enablejsapi=1&rel=0`}
          style={styles.video}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Video Player"
        ></iframe>
      </div>

      {/* Catalog Section */}
      <div style={styles.catalogContainer}>
        <h2 style={styles.title}>📖 Our Product Catalog</h2>
        <img src="./QR.png" alt="QR Code" style={styles.qrImage} />
        <a href="/sanviosystems.pdf" target="_blank" style={styles.catalogLink}>
          📂 View Full Catalog
        </a>
      </div>
    </div>
  );
};

export default VideoCatalogSection;
