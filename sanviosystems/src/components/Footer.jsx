import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt, faMapMarkerAlt, faMobile } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Social Media Section */}
      <div style={styles.socialSection}>
        <p style={styles.socialText}>Get connected with us on social networks:</p>
        <div style={styles.socialIcons}>
          <a href="https://www.facebook.com/people/Sanvio-Systems/61574421895868/" target="_blank" rel="noopener noreferrer" style={styles.icon}>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://www.instagram.com/stories/sanvio_systems/3583454443636332965/" target="_blank" rel="noopener noreferrer" style={styles.icon}>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={styles.icon}>
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a href="https://www.youtube.com/channel/UCvN2JbgdSzGKAOsO4vOPc1Q" target="_blank" rel="noopener noreferrer" style={styles.icon}>
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="tel:+9815901342" style={styles.icon}>
            <FontAwesomeIcon icon={faPhoneAlt} />
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={styles.footerContainer}>
        <div style={styles.column}>
          <h3 style={styles.heading}>Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000.902125912212!2d75.8449!3d30.9117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a8330dd74fd67%3A0x5f7c6f3b4e4e2a0d!2s353%2F14%2F1%2C%20Dr%20Hira%20Singh%20Road%2C%20Near%20Ghumar%20Mandi%2C%20Civil%20Lines%2C%20Ludhiana%2C%20Punjab%20141001!5e0!3m2!1sen!2sin!4v1632939169074!5m2!1sen!2sin"
            style={styles.map}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div style={styles.column}>
          <h3 style={styles.heading}>Quick Links</h3>
          <a href="/Home" style={styles.link}>Home</a>
          <a href="/About" style={styles.link}>About</a>
          <a href="/product" style={styles.link}>Products & Services</a>
          <a href="/Blogs" style={styles.link}>Blogs</a>
          <a href="/Contact" style={styles.link}>Contact</a>
        </div>

        <div style={styles.column}>
          <h3 style={styles.heading}>CONTACT</h3>
          <p style={styles.contactItem}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.contactIcon} /> 
            353/14/1, Dr Hira Singh Road, Near Ghumar Mandi,
            Civil Lines, Ludhiana, Punjab 141001
          </p>
          <p style={styles.contactItem}>
            <FontAwesomeIcon icon={faEnvelope} style={styles.contactIcon} /> 
            sanviosystems@gmail.com
          </p>
          <p style={styles.contactItem}>
            <FontAwesomeIcon icon={faPhoneAlt} style={styles.contactIcon} /> 
            +0161 5057224
          </p>
          <p style={styles.contactItem}>
            <FontAwesomeIcon icon={faMobile} style={styles.contactIcon} /> 
            9815901342
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={styles.copyright}>
        <p>© 2025 Sanvio Systems. All rights reserved.</p>
      </div>
    </footer>
  );
};

// CSS Styles
const styles = {
  footer: {
    backgroundColor: "red", // Darker red
    color: "#fff",
   
  },
  socialSection: {
    backgroundColor: "#b71c1c", // Dark red
    padding: "15px 0",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px"
  },
  socialText: {
    margin: "0",
    fontSize: "16px",
    fontWeight: "500"
  },
  socialIcons: {
    display: "flex",
    gap: "20px"
  },
  icon: {
    color: "#fff",
    fontSize: "20px",
    transition: "all 0.3s ease",
    ":hover": {
      color: "#ffcdd2", // Light red/pink on hover
      transform: "scale(1.2)"
    }
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
    gap: "30px"
  },
  column: {
    flex: "1",
    minWidth: "250px",
    padding: "0 15px"
  },
  heading: {
    color: "#ffebee", // Light red/white
    fontSize: "20px",
    marginBottom: "20px",
    position: "relative",
    paddingBottom: "10px",
    "::after": {
      content: '""',
      position: "absolute",
      left: "0",
      bottom: "0",
      width: "50px",
      height: "2px",
      backgroundColor: "#ffebee"
    }
  },
  link: {
    display: "block",
    color: "#fff",
    textDecoration: "none",
    margin: "12px 0",
    fontSize: "15px",
    transition: "all 0.3s ease",
    ":hover": {
      color: "#ffcdd2",
      paddingLeft: "5px"
    }
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    margin: "15px 0",
    fontSize: "15px",
    lineHeight: "1.5"
  },
  contactIcon: {
    marginRight: "10px",
    marginTop: "3px",
    color: "#ffcdd2"
  },
  map: {
    width: "100%",
    height: "200px",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  },
  copyright: {
    textAlign: "center",
    padding: "15px",
    backgroundColor: "#b71c1c",
    fontSize: "14px",
    fontWeight: "300"
  }
};

export default Footer;