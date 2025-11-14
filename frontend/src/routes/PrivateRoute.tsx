import { Navigate,Outlet } from "react-router-dom";
import { getToken } from "@/utils/localStorage";

const  PrivateRoute =()=>{
  return getToken()? <Outlet/> :<Navigate to="/login" replace />
}
export default PrivateRoute