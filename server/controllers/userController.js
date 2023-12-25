import UserModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authResponse = (res, user) => {
  generateToken(res, user._id);
  res.status(201).json({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    avatar: user.avatar,
    provider: user.provider,
  });
};

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
    authResponse(res, createdUser);
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

    authResponse(res, existedUser);
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

export const googleLogin = async (req, res, next) => {
  try {
    const { email, given_name, family_name, picture } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      const newUser = await UserModel.create({
        name: given_name + " " + family_name,
        email: email,
        provider: "google",
        avatar: picture,
      });
      authResponse(res, newUser);
    } else {
      if (user.provider !== "google") {
        res.status(401);
        throw new Error(
          "The email has already been registered with another provider."
        );
      } else {
        authResponse(res, user);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const facebookLogin = async (req, res, next) => {
  try {
    const { email, name, picture } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      const newUser = await UserModel.create({
        name,
        email,
        provider: "facebook",
        avatar: picture.data.url,
      });
      authResponse(res, newUser);
    } else {
      if (user.provider !== "facebook") {
        res.status(401);
        throw new Error(
          "The email has already been registered with another provider."
        );
      } else {
        authResponse(res, user);
      }
    }
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
