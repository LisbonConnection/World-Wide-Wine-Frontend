import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";


function WineDetails() {
    // Get Id of specific wine using useparams 
  const { id } = useParams(); 
  
  const [wine, setWine] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  const imageUrl = wine && wine.image && wine.image !== "" 
  ? `https://world-wide-wine.onrender.com${wine.image}` 
  : "https://i.imgur.com/r8bo8u7.png";
  
      const rating =
    wine && wine.ratingAverage && !isNaN(wine.ratingAverage)
      ? wine.ratingAverage.toFixed(2)
      : "No rating available";

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/wines/${id}`) 
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
    <>
      {/* main div */}

      <div className="flex min-h-screen">
        <div className=" flex space-y-10 bg-white shadow-2xl rounded-2xl"></div>

        {/* Left */}
        <div className="p-6 bg-gray-50 w-1/2 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <img
              src={imageUrl}
              alt={wine.wineName}
              className="w-2/4 h-auto object-cover rounded-lg mb-2 duration-200 hover:scale-110"
            />
          </div>
          <div className="mt-10 font-bold"> <span >Rating:</span> {rating}</div>
        </div>

        {/* right */}
        <div className="p-6 w-1/2 bg-gray-100 ">
          <div className="h-1/2 bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-gray-600 font-semibold text-2xl mt-30">
              {wine.wineName.toUpperCase()}
            </h1>
            <h1 className="text-gray-600 font-semibold text-lg mt-5">
              {wine.varietalName.toUpperCase()}
            </h1>
            <h1 className="text-gray-600 font-semibold text-lg mt-5">
              {wine.region.toUpperCase()}
            </h1>
            <h1 className="text-gray-600 font-semibold text-lg mt-10">
              {wine.description}
            </h1>
            <h1 className="text-gray-900 font-semibold text-4xl mt-10">
              {wine.price}€
            </h1>
          </div>

          <div className="mt-30 flex justify-center items-center space-x-5">
            <div className="flex h-14 w-14 items-center text-center justify-center mt-5 text-gray-600 border-1 border-gray-400 rounded-full cursor-pointer">
              <FaHome size={26} onClick={() => navigate('/allcollections')} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WineDetails;
