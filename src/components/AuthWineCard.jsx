import React from 'react'

function AuthWineCard({ wine, onWineClick }) {
  // Checking if ratingAverage exists and is a valid number
  const rating = wine.ratingAverage && !isNaN(wine.ratingAverage) ? wine.ratingAverage.toFixed(2) : "No rating available";

  return (
    <div className="wine-card" onClick={() => onWineClick(wine)} style={{ cursor: "pointer" }}>
      <h1>{wine.wineName}</h1>
      {/* <p><strong>Varietal:</strong> {wine.varietalName}</p> */}
      <p><strong>Region:</strong> {wine.region}</p>
      <p><strong>Price:</strong> €{wine.price}</p>
      {/* <p><strong>Rating:</strong> {rating}</p>  */}
    </div>
  );
}

export default AuthWineCard