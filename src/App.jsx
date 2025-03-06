import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import About from "./components/About";
import AllCollectionWines from "./components/AllCollectionWines"
import NewCollectionWines from "./components/NewCollectionWines"
import BestRatingWines from "./components/BestRatingWines"
// import { createContext } from "react";

// const themeContext = createContext();

function App() {


  return (
    <>

        <div className="container relative mx-auto p-6 ">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/allcollections" element={<AllCollectionWines />} />
            <Route path="/newcollections" element={<NewCollectionWines />} />
            <Route path="/bestratingns" element={<BestRatingWines />} />
          </Routes>
        </div>

    </>
  );
}

export default App;
// export { themeContext };
