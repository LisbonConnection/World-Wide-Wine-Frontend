import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddNewWine() {
  const [wineName, setwineName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [region, setRegion] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [varietalName, setVarietalName] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');

    if (!token) {
      setError("No authorization token found");
      return;
    }

    const formData = new FormData();
    formData.append('wineName', wineName);
    formData.append('image', image);
    formData.append('region', region);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('varietalName', varietalName);

    try {
      const response = await axios.post('http://localhost:5005/api/wines', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      console.error("Error creating wine:", error);
      setError("Error creating wine. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        className="flex flex-col items-center justify-center text-center space-y-4 border p-6 rounded-lg shadow-lg w-96 bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-4">Add New Wine</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-2 w-full">
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

        <div className="space-y-2 w-full">
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

        <div className="space-y-2 w-full">
          <label htmlFor="image" className="text-lg">Image</label>
          <div className="relative">
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              required
            />
            <div className="border p-2 rounded w-full bg-gray-100 text-center text-gray-700 hover:bg-gray-200">
              {image ? image.name : "Choose an image"}
            </div>
          </div>
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>

        <div className="space-y-2 w-full">
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

        <div className="space-y-2 w-full">
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

        <div className="space-y-2 w-full">
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