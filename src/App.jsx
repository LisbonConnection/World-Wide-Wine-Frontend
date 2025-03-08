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
import WineCard from "./components/WineCard";
import ErrorPage404 from "./components/ErrorPage404";
import WineDetails from "./components/WineDetails";
import Dashboard from "./pages/Dashboard";
import AddNewWine from "./components/AddNewWine";
import AuthWineDetails from "./components/AuthWineDetails"
import UpdateWine from "./components/UpdateWine";
import { ToastContainer } from "react-toastify";



// import { createContext } from "react";

// const themeContext = createContext();

function App() {


  return (
    <>

        <div className="container relative mx-auto p-6 ">
          <Navbar />
          <ToastContainer position="top-center" autoClose ={2000}/>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={ <IsAnon> <Login /> </IsAnon>} />
            <Route path="/signup" element={ <IsAnon> <SignUp /> </IsAnon>} />
            <Route path="/about" element={ <IsAnon> <About /> </IsAnon>} />
            <Route path="/allcollections" element={ <IsAnon> <AllCollectionWines /> </IsAnon>} />
            <Route path="/newcollections" element={ <IsAnon> <NewCollectionWines /> </IsAnon>} />
            <Route path="/bestratingns" element={ <IsAnon> <BestRatingWines /> </IsAnon>} />
            <Route path="/wine/:id" element={<WineDetails/>}/>
            <Route path="/dashboard" element={<Dashboard/> }/>
            <Route path="/addwine" element={<AddNewWine/>}/>
            <Route path="/updatewine/:id" element={<UpdateWine/> }/>
            <Route path="/wines/:id" element={<AuthWineDetails/>}/>
            <Route path="*" element={<ErrorPage404 />} />
          </Routes>
        </div>

    </>
  );
}

export default App;
// export { themeContext };
