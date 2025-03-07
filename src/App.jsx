import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import About from "./components/About";
import AllCollectionWines from "./components/AllCollectionWines"
import NewCollectionWines from "./components/NewCollectionWines"
import BestRatingWines from "./components/BestRatingWines"
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

// import { createContext } from "react";

// const themeContext = createContext();

function App() {


  return (
    <>

        <div className="container relative mx-auto p-6 ">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={ <IsAnon> <Login /> </IsAnon>} />
            <Route path="/signup" element={ <IsAnon> <SignUp /> </IsAnon>} />
            <Route path="/about" element={ <IsAnon> <About /> </IsAnon>} />
            <Route path="/allcollections" element={ <IsAnon> <AllCollectionWines /> </IsAnon>} />
            <Route path="/newcollections" element={ <IsAnon> <NewCollectionWines /> </IsAnon>} />
            <Route path="/bestratingns" element={ <IsAnon> <BestRatingWines /> </IsAnon>} />
          </Routes>
        </div>

    </>
  );
}

export default App;
// export { themeContext };
