import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/userSlice.js";
import { Navigate, Outlet } from "react-router-dom";

const UserContainer = () => {
  const { userInfo } = useSelector(userSelector);

  return !userInfo ? <Navigate to="/login" /> : <Outlet />;
};

export default UserContainer;
