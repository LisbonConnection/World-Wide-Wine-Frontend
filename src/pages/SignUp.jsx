
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
        toast.success('Account created successfully')
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <div className="flex-col items-center justify-center text-center space-y-2">
        <form
          className="flex flex-col items-center justify-center text-center space-y-2"
          onSubmit={handleSignupSubmit}
        >
          <h1>Signup</h1>

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="border p-2 rounded"
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="border p-2 rounded"
          />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
            className="border p-2 rounded"
          />

          {/* <button type="submit" className="bg-blue-500 text-white p-2">
            Sign Up
          </button> */}

<div className="relative flex justify-center items-center  text-center">
          <button className="absolute bg-blue-600 text-white text-xl hover:bg-blue-800 font-bold text-center h-10 w-40  flex items-center justify-center space-x-5 rounded transition-all ease-in-out duration-1000 hover:scale-110">
            <p className="flex justify-center items-center text-center ">
              Sign Up
            </p>
          </button>

          <div className="mt-4 ml-3 bg-purple-600 hover:bg-blue-700 h-8 w-40 rounded"></div>
        </div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have an account?</p>
        <Link to={"/login"}> <p className="hover:font-bold text-xl text-gray-600 font-bold h-16 w-auto rounded">Login</p> </Link>
      </div>
    </>
  );
}

export default SignupPage;