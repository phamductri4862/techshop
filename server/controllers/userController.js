import UserModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill all given fields.");
    }

    if (await UserModel.findOne({ email })) {
      res.status(400);
      throw new Error("The email has been registered already.");
    }

    const createdUser = await UserModel.create({
      name,
      email,
      password,
    });

    const token = generateToken(res, createdUser._id);
    res.status(201).json({
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please fill all given fields.");
    }

    const existedUser = await UserModel.findOne({ email });
    if (!existedUser || !(await existedUser.matchPassword(password))) {
      res.status(400);
      throw new Error("Email or password is not correct.");
    }

    const token = generateToken(res, existedUser._id);
    res.status(200).json({
      name: existedUser.name,
      email: existedUser.email,
      isAdmin: existedUser.isAdmin,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
    });
    res.status(200).json({ message: "Logged out." });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    });
  } catch (error) {
    next(error);
  }
};

