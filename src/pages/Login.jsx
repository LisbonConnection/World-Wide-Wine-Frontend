import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { toast } from "react-toastify";


function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);

        authenticateUser();
        navigate("/dashboard");
        toast.success("Login successful! Welcome to WWW");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      <form
        className="flex flex-col items-center justify-center text-center space-y-2"
        onSubmit={handleLoginSubmit}
      >
        <h1>Login</h1>

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
        {/* <button type="submit" className="bg-blue-500 text-white p-2">
            Login
          </button> */}

        <div className="relative flex justify-center items-center mb-5 text-center">
          <button className="absolute bg-blue-600 text-white text-xl hover:bg-blue-800 font-bold text-center h-10 w-40  p-5 flex items-center justify-center space-x-5 rounded transition-all ease-in-out duration-1000 hover:scale-110">
            <p className="flex justify-center items-center text-center ">
              Login
            </p>
          </button>

          <div className="mt-5 ml-3 bg-purple-600 hover:bg-blue-700 h-8 w-40 rounded"></div>
        </div>
        

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Don't have an account yet?</p>
        <Link to={"/signup"}> <p className="hover:bg-blue-100 hover:text-blue-400 hover:font-bold text-xl text-gray-600 font-bold h-16 w-40 rounded flex justify-center items-center text-center">Sign Up</p> </Link>
      </form>
    </div>
  );
}

export default Login;
