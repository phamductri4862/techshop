import express from "express";
import {
  facebookLogin,
  getProfile,
  googleLogin,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { verifyUser } from "../middlewares/verifyAuth.js";
const userRoutes = express.Router();

userRoutes.get("/profile", verifyUser, getProfile);
userRoutes.post("/login", loginUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/logout", logoutUser);
userRoutes.post("/google-login", googleLogin);
userRoutes.post("/facebook-login", facebookLogin);

export default userRoutes;
