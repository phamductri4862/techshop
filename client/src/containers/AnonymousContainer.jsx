import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/userSlice.js";
import { Navigate, Outlet } from "react-router-dom";

const AnonymousContainer = () => {
  const { userInfo } = useSelector(userSelector);

  return userInfo ? <Navigate to="/" /> : <Outlet />;
};

export default AnonymousContainer;
