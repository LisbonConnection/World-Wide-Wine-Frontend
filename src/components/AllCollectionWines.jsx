import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import WineCard from "./WineCard";


function AllCollectionWines() {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/wines`)
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
    <div className="max-w-full-xl mx-auto mt-20">
      <div className="rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
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
