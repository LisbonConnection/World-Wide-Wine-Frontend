import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddNewWine() {
  const [wineName, setwineName] = useState('');
  const [image, setImage] = useState('');
  const [region, setRegion] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [varietalName, setVarietalName] = useState('');  
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    // get our stored token
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError("No authorization token found");
      return;
    }

   // create new wine request to backend
    const newWine = {
      wineName,
      image,
      region,
      price,
      description,
      varietalName,  
    };
   
    axios
      .post(
        'http://localhost:5005/api/wines',
        newWine,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error("Error creating wine:", error);
        setError("Error creating wine. Please try again.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        className="flex flex-col items-center justify-center text-center space-y-4 border p-6 rounded-lg shadow-lg w-96 bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-4">Add New Wine</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-2">
          <label htmlFor="wineName" className="text-lg">Wine Name</label>
          <input
            type="text"
            id="wineName"
            value={wineName}
            onChange={(e) => setwineName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="varietalName" className="text-lg">Varietal Name</label>
          <input
            type="text"
            id="varietalName"
            value={varietalName}
            onChange={(e) => setVarietalName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="text-lg">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="region" className="text-lg">Region</label>
          <input
            type="text"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="text-lg">Price (€)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-lg">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        >
          Add Wine
        </button>
      </form>

      <a href="/" className="mt-4 text-blue-500 text-center">Back to Collection</a>
    </div>
  );
}

export default AddNewWine;
