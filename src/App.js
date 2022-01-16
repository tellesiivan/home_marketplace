import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
      <NavBar />
      <ToastContainer />
    </>
  );
}

export default App;
