import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "@/utils/localStorage";

const PublicRoute = () => {
  return getToken() ? <Navigate to="/client" replace /> : <Outlet />;
};
export default PublicRoute;
