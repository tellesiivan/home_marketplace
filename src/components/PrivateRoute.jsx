import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import SkeletonLoad from "./SkeletonLoad";

export default function PrivateRoute() {
  const { loggedIn, loading } = useAuthStatus();

  if (loading) {
    return <SkeletonLoad />;
  }

  // Outlet >>> renders child components, if any (<Route path="/profile" element={<Profile />} />)
  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}
