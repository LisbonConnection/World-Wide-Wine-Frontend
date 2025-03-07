import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";

const API_URL = "http://localhost:5005";

function WineDetails() {
    // Get Id of specific wine using useparams 
  const { id } = useParams(); 
  
  const [wine, setWine] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`${API_URL}/api/wines/${id}`) 
      .then((response) => {
        setWine(response.data);
      })
      .catch((error) => {
        console.error("Error fetching wine details:", error);
        setError("Error fetching wine details");
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!wine) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{wine.wineName}</h2>
      <p><strong>Varietal:</strong> {wine.varietalName}</p>
      <p><strong>Region:</strong> {wine.region}</p>
      <p><strong>Price:</strong> €{wine.price}</p>
      <p><strong>Description:</strong> {wine.description}</p>
      <p><strong>Rating:</strong> {wine.ratingAverage.toFixed(2)}</p>
      {/* <p><strong>Full Description:</strong> {wine.fullDescription}</p>
      <p><strong>Year:</strong> {wine.year}</p> */}

      
      <button onClick={() => navigate("/")}>Back to Home</button> 
    </div>
  );
}

export default WineDetails;
