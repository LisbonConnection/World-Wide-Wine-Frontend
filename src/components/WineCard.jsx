import React from "react";

function WineCard({ wine, onWineClick }) {
  // Checking if ratingAverage exists and is a valid number
  const rating =
    wine.ratingAverage && !isNaN(wine.ratingAverage)
      ? wine.ratingAverage.toFixed(2)
      : "No rating available";

  // Prepend the base URL to the image path if it's a relative path
  const imageUrl = wine.image && wine.image !== "" 
    ? `http://localhost:5005${wine.image}` // prepend base URL
    : "https://i.imgur.com/r8bo8u7.png";   // fallback image if no image is provided

  return (
    <div
      className="wine-card border rounded p-4 shadow-lg cursor-pointer"
      onClick={() => onWineClick(wine)}
      style={{ cursor: "pointer" }}
    >
      {/* Render the image */}
      <div className="image-container mb-4">
        <img
          src={imageUrl}
          alt={wine.wineName}
          className="w-full h-48 object-cover rounded mb-2"
        />
      </div>

      <h3 className="font-bold text-xl">{wine.wineName}</h3>
      <p><strong>Varietal:</strong> {wine.varietalName}</p>
      <p><strong>Region:</strong> {wine.region}</p>
      <p><strong>Price:</strong> €{wine.price}</p>
      <p><strong>Rating:</strong> {rating}</p>
    </div>
  );
}

export default WineCard;
