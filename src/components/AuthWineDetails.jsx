import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import RatingSelect from "../components/RatingSelect";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { FaPenSquare } from "react-icons/fa";


function AuthWineDetails() {
  const { id } = useParams();
  const [wine, setWine] = useState(null);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(wine ? wine.ratingAverage : 0);
  const navigate = useNavigate();

  const imageUrl = wine && wine.image && wine.image !== "" 
  ? `${import.meta.env.VITE_API_URL}${wine.image}` 
  : "https://i.imgur.com/r8bo8u7.png";

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/wines/${id}`)
      .then((response) => {
        setWine(response.data);
        setRating(response.data.ratingAverage);
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

  //we handle delete wine
  const handleDelete = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No authorization token found.");
      return;
    }

    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/wines/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Wine deleted successfully:", response.data);
        toast.success('Wine successfully deleted!')
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error deleting wine:", error);
        setError("Error deleting wine");
      });
  };

  //we handle rating change
  const handleRating = (newRating) => {
    setRating(newRating);

    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No authorization token found.");
      return;
    }

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/wines/${id}`,
        { ratingAverage: newRating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Wine rating updated:", response.data);
        toast.success("Rating updated successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error updating wine rating:", error);
        setError("Error updating wine rating");
      });
  };

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
          <div className="mt-10">
            <RatingSelect
              currentRating={wine.ratingAverage}
              onRatingChange={handleRating}
            />
          </div>
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
              <FaPenSquare size={26} onClick={handleUpdate} />
            </div>

            <div className="flex h-14 w-14 items-center text-center justify-center mt-5 text-gray-600 border-1 border-gray-400 rounded-full cursor-pointer">
              <FaTrash size={26} onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthWineDetails;
