import React from "react";

function WineCard({ wine, onWineClick }) {
  // Checking if ratingAverage exists and is a valid number
  const rating =
    wine.ratingAverage && !isNaN(wine.ratingAverage)
      ? wine.ratingAverage.toFixed(2)
      : "No rating available";

  // Prepend the base URL to the image path if it's a relative path
  const imageUrl = wine.image && wine.image !== "" 
    ? `http://localhost:5005${wine.image}` 
    : "https://i.imgur.com/r8bo8u7.png";  
    
  return (
    <>
      <div className="w-full m-2 rounded-lg">
        <div className="flex items-center justify-center w-full text-xl text-center text-white rounded-lg">
          <div className="group relative overflow-hidden rounded-lg">
            <div>
              <img
                src={imageUrl}
                alt={wine.wineName}
                className="w-42 h-42 object-cover rounded-lg mb-2 duration-200 group-hover:scale-110"
              />
            </div>
            <div className="flex absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-gray-600 group-hover:from-grey-50 group-hover:to-white group-hover:opacity-70"></div>
            <h5 className="font-bold absolute duration-200 w-full bottom-8 group-hover:scale-110 group-hover:text-white">
              {wine.wineName}
            </h5>
            <h3 className="absolute duration-200 w-full bottom-2 group-hover:scale-110 group-hover:text-white">
            {rating}
            </h3>
          </div>
        </div>
      </div>

      {/* <div
      className="wine-card border rounded p-4 shadow-lg cursor-pointer"
      onClick={() => onWineClick(wine)}
      style={{ cursor: "pointer" }}
    >
      Render the image
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
    </div> */}
    </>
  );
}

export default WineCard;
