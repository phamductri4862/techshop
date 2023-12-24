import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    error.message = "Unauthorized user.";
    res.status(401);
    next(error);
  }
};

export const verifyAdmin = (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(401);
    error.message = "Unauthorized admin.";
    next(error);
  }
};
