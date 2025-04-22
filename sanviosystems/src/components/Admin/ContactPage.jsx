import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact Submissions</h2>
      {contacts.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        contacts.map((contact) => (
          <div
            key={contact._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "#f9f9f9",
              position: "relative",
            }}
          >
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Contact No:</strong> {contact.contact}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Message:</strong> {contact.message}</p>
            <button
              onClick={() => handleDelete(contact._id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactPage;
