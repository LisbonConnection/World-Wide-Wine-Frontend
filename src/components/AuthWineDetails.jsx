import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";

const API_URL = "http://localhost:5005";

function AuthWineDetails() {
  // get id of specific wine using useParams
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

  const handleUpdate = () => {
    navigate(`/updatewine/${id}`);
  };

  const handleDelete = () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError("No authorization token found.");
      return;
    }

    axios
      .delete(`${API_URL}/api/wines/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Wine deleted successfully:", response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error deleting wine:", error);
        setError("Error deleting wine");
      });
  };


  return (
    <div className="wine-details-container">
      <h2>{wine.wineName}</h2>
      <p><strong>Varietal:</strong> {wine.varietalName}</p>
      <p><strong>Region:</strong> {wine.region}</p>
      <p><strong>Price:</strong> €{wine.price}</p>
      <p><strong>Description:</strong> {wine.description}</p>
      <p><strong>Rating:</strong> {wine.ratingAverage.toFixed(2)}</p>

      {/* Update button */}
      <button onClick={handleUpdate} className="update-btn">
        Update Wine
      </button>

      <button onClick={handleDelete} className="delete-btn">
        Delete Wine
      </button>

      {/* Back to Home button */}
      <button onClick={() => navigate("/dashboard")} className="back-home-btn">
        Back to Home
      </button>
    </div>
  );
}

export default AuthWineDetails;
