import User from "../models/User.js";
import { errorHandle } from "../utils/errorHandle.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next(errorHandle(400, "All fields required."));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User has been created.",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};
export const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return next(errorHandle(404, "User not found"));
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return next(errorHandle(400, "wrong username or password"));

    const token = await jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        status: 200,
        message: "Login Successful.",
      });
  } catch (error) {
    next(error);
  }
};
export const logoutController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
