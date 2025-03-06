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
          <p className="h-16 w-auto text-[40px]">Logo</p>

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
              <button className=" hover:bg-blue-100 hover:text-blue-400 hover:font-bold text-black h-16 w-auto rounded flex items-center">
                About
              </button>
              <button className=" hover:bg-blue-100 hover:text-blue-400 hover:font-bold text-black h-16 w-auto rounded flex items-center">
                Signup
              </button>

              <div className="flex my-3">
                <button className="bg-blue-600 text-white hover:bg-blue-700 font-bold text-black h-12 w-auto rounded-2xl p-5 flex items-center">
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
