// src/pages/SignupPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {};

  return (
    <>
      <div className="flex-col items-center justify-center text-center space-y-10">
        
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
            className="border p-2"
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="border p-2"
          />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
            className="border p-2"
          />

          <button type="submit" className="bg-blue-500 text-white p-2">
            Sign Up
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    </>
  );
}

export default SignupPage;
