import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { ThemeContext } from '../context/theme.context';

function Navbar() {
  const { isLoggedIn, user } = useContext(AuthContext);
  // const {theme} = useContext(ThemeContext);
  return (
    <>
      <div>
        <div className="flex justify-between my-6">
          <Link to="/">
            <p className="h-16 w-auto text-[40px]">Logo</p>
          </Link>
          {isLoggedIn && (
            <>
              <button className=" hover:bg-blue-100 hover:text-blue-400 hover:font-bold text-black h-16 w-auto rounded flex items-center">
                Wines
                <ChevronDownIcon className="h-5 w-5 ml-2" />
              </button>

              <button className=" hover:bg-blue-100 hover:text-blue-400 hover:font-bold text-black h-16 w-auto rounded flex items-center">
                Beer
                <ChevronDownIcon className="h-5 w-5 ml-2" />
              </button>

              <button className=" hover:bg-blue-100 hover:text-blue-400 hover:font-bold text-black h-16 w-40 rounded flex items-center">
                Drink now
                <ChevronDownIcon className="h-5 w-5 ml-2" />
              </button>

              <div className="flex my-3">
                <button className="bg-blue-600 text-white hover:bg-blue-700 font-bold text-black h-12 w-auto rounded-2xl p-5 flex items-center">
                  Logout
                </button>
              </div>
            </>
          )}

          {!isLoggedIn && (
            <>
              {/* <Link to = "about">
            <button className=" hover:bg-blue-100 hover:text-blue-400 hover:font-bold text-black h-16 w-auto rounded flex items-center ">
                Collections
                <ChevronDownIcon className="h-5 w-5 ml-2" />
              </button>

            </Link> */}

              <ul className="flex space-x-4">
                <li className="relative group items-center flex">
                  <Link to="/collection" className="text-gray-500 flex">
                    COLLECTION <ChevronDownIcon className="h-5 w-5 ml-2" />
                  </Link>
                  <div className="absolute left-0 mt-2 w-100 bg-white shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 ease-out">
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
                          to="/bestratingns"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          BEST RATING
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>

              <Link to="signup">
                <button className=" hover:bg-blue-100 hover:text-blue-400 hover:font-bold text-black h-16 w-auto rounded flex items-center">
                  Signup
                </button>
              </Link>

              <div className="flex my-3">
                <Link to="login">
                  <button className="bg-blue-600 text-white hover:bg-blue-700 font-bold text-black h-12 w-auto rounded-2xl p-5 flex items-center">
                    Login
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
