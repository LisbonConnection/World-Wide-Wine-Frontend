import React from "react";
import { SocialIcon } from "react-social-icons";
import Sam from "../assets/samshort.png";

function About() {
  return (
    <>
      <div className="flex min-h-full">
        <div className=" flex space-y-10 bg-white shadow-2xl rounded-2xl"></div>

        {/* Left */}
        <div className="p-6 bg-white w-1/2 flex flex-col justify-center items-center">
          <div className="flex flex-col ">
            <div className="flex items-center justify-center">
              <img
                src={Sam}
                alt="profile-pic"
                className="w-2/4 h-80 object-cover rounded-lg mb-2 duration-200 hover:scale-110"
              />
            </div>

            <h1 className="mt-5 text-2xl text-center text-gray-600 font-bold">
              Samuel Onoja
            </h1>

            <h1 className="mt-5">
              A passionate Full Stack MERN Developer with expertise in building
              dynamic and scalable web applications. I specialize in the MERN
              stack, which comprises MongoDB, Express.js, React, and Node.js,
              and I also have experience building cross-platform mobile
              applications with Flutter.
            </h1>

            <div className="mt-10 text-2xl flex justify-center">
              <div className="flex space-x-10">
                <div>
                  <SocialIcon url="https://github.com/Samuelonoja" />
                </div>
                <div>
                  <SocialIcon url="https://www.linkedin.com/in/samuelonoja" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="p-6 bg-gray-50 w-1/2 flex flex-col justify-center items-center">
          <div className="flex flex-col ">
            <div className="flex items-center justify-center">IMG</div>

            <h1 className="mt-5 text-2xl text-center text-gray-600 font-bold">
              Name
            </h1>

            <h1 className="mt-5">About</h1>

            <div className="mt-10 text-2xl flex justify-center">
              <div className="flex space-x-10">
                <div>
                  <SocialIcon url="https://github.com/" />
                </div>
                <div>
                  <SocialIcon url="https://www.linkedin.com/in/" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
