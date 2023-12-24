import express from "express";
import {
  getProfile,
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

export default userRoutes;
