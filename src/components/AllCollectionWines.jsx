import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AllCollectionWines() {
  // Define state to store the wines
  const [wines, setWines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // get wines without token
    axios
      .get(`${API_URL}/api/wines`)
      .then((response) => {
        setWines(response.data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error("Error fetching wines:", error);
        setError("Error fetching wines");
      });
  }, []); 

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* <h1>All Collection Wines</h1> */}
      <ul>
        {wines.length > 0 ? (
          wines.map((wine) => (
            <li className="flex flex-col" key={wine._id}>
              <div className="font-bold">{`Wine Name: ${wine.wineName}`}</div>
              <div>{`Varietal Name: ${wine.varietalName}`}</div>
              <div>{`Region: ${wine.region}`}</div>
              <div>{`Price: €${wine.price}`}</div>
              <div>{`Description: ${wine.description}`}</div>
              <div className="font-bold">{`Rating: ${wine.ratingAverage.toFixed(2)}`}</div>{" "}
            </li>
          ))
        ) : (
          <p>No wines available</p>
        )}
      </ul>
    </div>
  );
}

export default AllCollectionWines;
