import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import WineCard from "./WineCard";

const API_URL = "http://localhost:5005";

function AllCollectionWines() {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/wines`)
      .then((response) => {
        setWines(response.data);
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
    <div className="wine-collection">
      <div className="wine-list">
        {wines.length > 0 ? (
          wines.map((wine) => (
            // {/* Link to wine details */}
            <Link to={`/wine/${wine._id}`} key={wine._id}> 
              <WineCard wine={wine} />
            </Link>
          ))
        ) : (
          <p>No wines available</p>
        )}
      </div>
    </div>
  );
}

export default AllCollectionWines;
