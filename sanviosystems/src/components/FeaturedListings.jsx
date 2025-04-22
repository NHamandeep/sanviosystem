import React from "react";
import ListingCard from "./ListingCard";  // Import ListingCard
import listings from "../data/listingsData";  // Import Data
import "./FeaturedListings.css";  // CSS import

const FeaturedListings = () => {
  return (
    <section className="featured-listings">
      <h2>Featured Listings</h2>
      <div className="listings-container">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedListings;
