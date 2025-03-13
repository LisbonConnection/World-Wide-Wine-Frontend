import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { useEffect } from "react";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const handleChange = (e) => {
    setText(e.target.value);
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("No token found");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/wines/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          text: e.target.value,
        },
      })
      .then((response) => {
        console.log("Search results:", response.data);
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error(
          "Error while searching for wines:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("No token found");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/wines/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          text,
        },
      })
      .then((response) => {
        console.log("Search results:", response.data);
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error(
          "Error while searching for wines:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleClick = (item) => {
    setText("");
    setSearchResults([]);
  };

  const handleNavigate = () => {
    setText("");
    setSearchResults([]);
  };

  const handleLogout = () => {
    logOutUser();
    setText("");
    setSearchResults([]);
  };

  useEffect(() => {
    setText("");
    setSearchResults([]);
  }, [location]);

  return (
    <>
      <div>
        <div className="flex my-4 justify-between ml-20 mr-20">
          <div className="flex space-x-20">
            <Link to={isLoggedIn ? "/dashboard" : "/"} onClick={handleNavigate}>
              <div className="flex flex-col ml-5">
                <p className="w-auto text-xl font-bold flex justify-cente text-blue-950">
                  WWW
                </p>
                <p className="w-auto italic text-sm text-blue-950">World Wide Wine</p>
              </div>
            </Link>

            {isLoggedIn && (
              <>
                <div>
                  <div className="h-16 w-auto text-xl mt-6 grid gap-6">
                    <div>
                      <form>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full bg-grey-200 pr-40 text-black"
                            placeholder="Search wine"
                            value={text}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!isLoggedIn && (
              <>
                <div className="flex">
                  <ul className="flex space-x-4 mb-10">
                    <li className="relative group items-center flex">
                      <Link
                        to="/collection"
                        className="text-gray-600 flex font-bold text-xl"
                      >
                        COLLECTION <ChevronDownIcon className="h-5 w-5 ml-2" />
                      </Link>
                      <div className="absolute left-0 mt-2 w-100 bg-white shadow-lg opacity-0 group-hover:opacity-100 transform scale-110 group-hover:scale-100 transition-all duration-300 ease-out">
                        <ul className="flex">
                          <li>
                            <Link
                              to="/allcollections"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              All COLLECTION
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/newcollections"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              NEW COLLECTIONS
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/bestratings"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              BEST RATING
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          {!isLoggedIn && (
            <>
              <div className="flex justify-end space-x-4">
                <Link to="signup">
                  <button className="hover:bg-blue-100 hover:text-blue-400 hover:font-bold text-xl text-gray-600 font-bold h-14 w-30 rounded flex justify-center items-center text-center">
                    Sign Up
                  </button>
                </Link>

                <Link to="login">
                  <div className="relative flex justify-center items-center mb-10 text-center">
                    <button className="absolute bg-blue-600 text-white text-xl hover:bg-blue-800 font-bold text-center h-15 w-70  p-5 flex items-center justify-center space-x-5 rounded transition-all ease-in-out duration-1000 hover:scale-110">
                      <p className="flex justify-center items-center text-center ">
                        Login
                      </p>
                    </button>

                    <div className="mt-5 ml-3 bg-purple-600 hover:bg-blue-700 h-13 w-70 rounded"></div>
                  </div>
                </Link>

                <div className="flex h-8 w-8 ml-5 mr-5 items-center text-center justify-center mt-5 text-gray-700 border-1 border-gray-400 rounded-full">
                  <Link to="/about">
                    <FaInfoCircle size={24} />
                  </Link>
                </div>
              </div>
            </>
          )}

          {isLoggedIn && (
            <>
              <div className="flex justify-between">
                <div className="flex space-x-5">
                  <div className="flex h-10 w-10 items-center text-center justify-center mt-5 text-gray-600 border-1 border-gray-400 rounded-full">
                    <Link to="/addwine" onClick={handleNavigate}>
                      {" "}
                      <FaPlus size={24} />{" "}
                    </Link>
                  </div>

                  <div className="relative flex justify-center items-center text-center mb-5">
                    <button
                      onClick={handleLogout}
                      className="absolute bg-blue-600 text-white text-xl hover:bg-blue-800 font-bold text-center h-15 w-70 flex items-center justify-center rounded transition-all ease-in-out duration-1000 hover:scale-110"
                    >
                      <p className="flex justify-center items-center text-center ">
                        Logout
                      </p>
                    </button>

                    <div className="mt-5 ml-3 bg-purple-600 hover:bg-blue-700 h-13 w-70 rounded"></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {searchResults.length > 0 && (
          <div className="search-results mt-4 bg-white shadow-lg p-4">
            <h2 className="text-xl font-bold">Wine Collections:</h2>
            <ul>
              {searchResults.map((wine) => (
                <li key={wine._id}>
                  <Link
                    to={`/wines/${wine._id} `}
                    className="text-blue-600"
                    onClick={handleClick}
                  >
                    {wine.wineName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {text && searchResults.length === 0 && (
          <div className="mt-4 text-gray-500">No wines found for "{text}".</div>
        )}
      </div>
    </>
  );
}

export default Navbar;
