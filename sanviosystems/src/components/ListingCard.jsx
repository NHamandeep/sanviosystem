import React from "react";
import "./FeaturedListings.css";  // Same CSS use karenge

const ListingCard = ({ listing }) => {
  return (
    <div className="listing-card">
      <img src={listing.image} alt={listing.title} className="listing-image" />
      <div className="listing-info">
        <div className="badges">
          {listing.badge.map((badge, index) => (
            <span key={index} className={`badge badge-${badge.toLowerCase()}`}>{badge}</span>
          ))}
        </div>
        <p className="listing-type">{listing.type}</p>
        <h3 className="listing-title">{listing.title}</h3>
        <p className="listing-location">📍 {listing.location}</p>
        <div className="listing-price">{listing.price}</div>
      </div>
    </div>
  );
};

export default ListingCard;
