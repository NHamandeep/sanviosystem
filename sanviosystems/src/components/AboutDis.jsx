import React from "react";

import { motion } from "framer-motion";

const sections = [
  {
    
    title: "About Us ",
    desc: "The team at Sanvio Systems Ludhiana is a dynamic group of skilled professionals united by a shared passion for technology and innovation. Led by Er Sandeep Mahajan, a seasoned industry expert with over three decades of experience in Information Technology and office automation, the team brings a wealth of knowledge and expertise to the table. Under Sandeep’s visionary leadership, the team consistently strives to stay ahead of the curve, delivering cutting-edge solutions tailored to the unique needs of each client. Their collaborative spirit, commitment to excellence, and drive for customer success make Sanvio Systems a trusted partner for businesses looking to enhance their operations through technology.",
    img: "/Aboutus.jpg",
  },
  {
    
    title: "Our Mission",
    desc: "At Sanvio Systems Ludhiana, our mission is to provide innovative IT services and office automation solutions that streamline business operations, enhancing efficiency and driving long-term success.",
    img: "/Mission.jpg",
    reverse: true,
  },
  {
    
    title: "Our Vision",
    desc: "To be a leader in Information Technology and office automation solutions, empowering businesses and individuals with innovative, reliable, and sustainable technology that drives efficiency, productivity, and growth.",
    img: "/Vision.jpg",
  },
  {
    
    title: "Our Core Value",
    desc: <p>
      1.	Integrity: Committing to transparency and trust in all our actions. <br />
    2.	Innovation: Embracing creativity and staying ahead in an ever-evolving tech landscape.<br />
    3.	Customer-Centricity: Putting our clients at the center of everything we do.<br />
    4.	Teamwork: Fostering a collaborative and inclusive environment for employees and partners alike. <br />
    5.	Adaptability: Responding quickly and effectively to market shifts and client needs with agile solutions.
    </p>,
    img: "/Values.jpg",
    reverse: true,
  },
];

const AboutDis = () => {
  return (
    <div className="about-container">
      {sections.map(({ number, title, desc, img, reverse }, index) => (
        <motion.div
          className={`about-section ${reverse ? "reverse" : ""}`}
          key={index}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="about-text">
            <h2 className="about-number">{number}</h2>
            <h3 className="about-title">{title}</h3>
            <p className="about-desc">{desc}</p>
          </div>
          <motion.div className="about-image" whileHover={{ scale: 1.1 }}>
            <img src={img} alt={title} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default AboutDis;

// Updated Animated CSS
const styles = `
.about-container {
  width:100;
  background: url('/background-3.jpg');
  background-repeat: no-repeat;
  background-size: cover; 
  padding: 80px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  
  width: 100%;
  padding: 50px;
  border-radius: 15px;
  background: white;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.about-section:hover {
  transform: translateY(-5px);
  box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.15);
}

.about-section.reverse {
  flex-direction: row-reverse;
}

.about-text {
  flex: 1;
  text-align: justify;
  padding: 20px;
}

.about-number {
  color: #ff4d4d;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
  transition: transform 0.3s;
 
}
  .about-number:hover {
  transform: scale(1.1);
   color:rgb(13, 137, 238);
   font-size: 60px;
   
  
}

.about-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

 .about-title:hover {
  transform: scale(1.1);
   color:rgb(255, 0, 0);
   font-size: 30px;
   
  
}

.about-desc {
  font-size: 18px;
  color: #555;
  line-height: 1.8;
}

.about-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-image img {
  width: 100%;
  max-width: 300px;
  border-radius: 15px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.about-image img:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .about-section {
    flex-direction: column !important;
    text-align: center;
    padding: 30px;
  }
  
  .about-image img {
    max-width: 300px;
  }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
