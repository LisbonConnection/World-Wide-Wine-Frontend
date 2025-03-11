import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = "http://localhost:5005";

function UpdateWine() {

  const { id } = useParams(); 
  const navigate = useNavigate();

  const [wineName, setWineName] = useState('');
  const [varietalName, setVarietalName] = useState('');
  const [region, setRegion] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  // get the wine details to populate the form
  useEffect(() => {
    axios.get(`${API_URL}/api/wines/${id}`)
      .then((response) => {
        const wine = response.data;
        setWineName(wine.wineName);
        setVarietalName(wine.varietalName);
        setRegion(wine.region);
        setPrice(wine.price);
        setDescription(wine.description);
      })
      .catch((error) => {
        console.error("Error fetching wine details:", error);
        setError("Error fetching wine details");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedWine = {
      wineName,
      varietalName,
      region,
      price,
      description,
    };

    const token = localStorage.getItem('authToken');
    
    if (!token) {
      setError("No authorization token found.");
      return;
    }

    axios.put(`${API_URL}/api/wines/${id}`, updatedWine, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        navigate(`/dashboard`);
        toast.success('Wine successfully updated!')
      })
      .catch((error) => {
        console.error('Error updating wine:', error);
        setError('Error updating wine');
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-5">
      <h1>Update Wine</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="w-full max-w-xs">
          <label className="block">Wine Name</label>
          <input
            type="text"
            value={wineName}
            onChange={(e) => setWineName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="w-full max-w-xs">
          <label className="block">Varietal Name</label>
          <input
            type="text"
            value={varietalName}
            onChange={(e) => setVarietalName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="w-full max-w-xs">
          <label className="block">Region</label>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="w-full max-w-xs">
          <label className="block">Price (€)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="w-full max-w-xs">
          <label className="block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Update Wine
        </button>
      </form>
    </div>
  );
}

export default UpdateWine;
