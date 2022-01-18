import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkeletonLoad from "./components/SkeletonLoad";
import PrivateRoute from "./components/PrivateRoute";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import NavBar from "./components/NavBar";
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <>
      <Suspense fallback={<SkeletonLoad />}>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          {/* if private route, wrap child component (Outlet) that should be render if certain condition is true */}
          <Route path="/profile" element={<PrivateRoute />}>
            {/* outlet below */}
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create" element={<PrivateRoute />}>
            <Route path="/create" element={<CreateListing />} />
          </Route>
          <Route path="/category/:categoryName" element={<Category />} />
        </Routes>
      </Suspense>
      <NavBar />
      <ToastContainer />
    </>
  );
}

export default App;
