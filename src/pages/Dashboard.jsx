import React from "react";
import { Link } from "react-router-dom";
import AuthWineCard from "../components/AuthWineCard";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";


function Dashboard() {
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
    <>
      <div className="wine-collection">
        <div className="mt-20 wine-list rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {wines.length > 0 ? (
            wines.map((wine) => (
              // {/* Link to wine details */}
              <Link to={`/wines/${wine._id}`} key={wine._id}>
                <AuthWineCard wine={wine} />
              </Link>
            ))
          ) : (
            <p className="flex justify-center items-center text-center">Loading....</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
