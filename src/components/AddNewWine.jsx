import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddNewWine() {
  const [wineName, setwineName] = useState("");
  const [image, setImage] = useState(null);
  const [region, setRegion] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [varietalName, setVarietalName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authorization token found");
      return;
    }

    const formData = new FormData();
    formData.append("wineName", wineName);
    formData.append("image", image);
    formData.append("region", region);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("varietalName", varietalName);

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/wines`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/dashboard");
          toast.success("Wine added succesfully!")
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

        <div className="space-y-2 w-full">
          <label htmlFor="wineName" className="text-lg">
            Wine Name
          </label>
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
          <label htmlFor="varietalName" className="text-lg">
            Varietal Name
          </label>
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
          <label htmlFor="image" className="text-lg">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="space-y-2 w-full">
          <label htmlFor="region" className="text-lg">
            Region
          </label>
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
          <label htmlFor="price" className="text-lg">
            Price (€)
          </label>
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
          <label htmlFor="description" className="text-lg">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
          ></textarea>
        </div>

        <div className="relative flex justify-center items-center text-center">
          <button
            // onClick={() => navigate("/dashboard")}
            className="absolute bg-blue-600 text-white text-xl hover:bg-blue-800 font-bold text-center h-8 w-80  p-5 flex items-center justify-center space-x-5 rounded transition-all ease-in-out duration-1000 hover:scale-110"
          >
            <p className="flex justify-center items-center text-center ">
              Add wine
            </p>
          </button>

          <div className="mt-5 ml-3 bg-purple-600 hover:bg-blue-700 h-8 w-80 rounded"></div>
        </div>
      </form>

      <div className="relative flex justify-center items-center mt-10 text-center">
        {/* <button
          onClick={() => navigate("/dashboard")}
          className="absolute bg-blue-500 text-white text-l hover:bg-blue-800 font-bold text-center h-10 w-60 p-5 flex items-center justify-center space-x-5 rounded transition-all ease-in-out duration-1000 hover:scale-110"
        >
          <p className="flex justify-center items-center text-center">
            Back to Homepage
          </p>
        </button> */}

        <div className="relative flex justify-center items-center text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="absolute bg-blue-600 text-white text-xl hover:bg-blue-800 font-bold text-center h-8 w-80  p-5 flex items-center justify-center space-x-5 rounded transition-all ease-in-out duration-1000 hover:scale-110"
          >
            <p className="flex justify-center items-center text-center ">
              Back to Homepage
            </p>
          </button>

          <div className="mt-5 ml-3 bg-purple-600 hover:bg-blue-700 h-8 w-80 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default AddNewWine;
