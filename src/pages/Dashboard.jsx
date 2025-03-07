import React from 'react'
import { Link } from 'react-router-dom'
import AuthWineCard from '../components/AuthWineCard'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';

const API_URL = "http://localhost:5005";


function Dashboard() {

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
    <>
    <div>

        <Link to="/addwine">
        <button>Create a wine</button>
        </Link>
    </div>

    <div className="wine-collection">
      <div className="wine-list">
        {wines.length > 0 ? (
          wines.map((wine) => (
            // {/* Link to wine details */}
            <Link to={`/wines/${wine._id}`} key={wine._id}> 
              <AuthWineCard wine={wine} />
            </Link>
          ))
        ) : (
          <p>No wines available</p>
        )}
      </div>
    </div>

    </>

  )
}

export default Dashboard