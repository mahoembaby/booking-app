import User from "../models/User.js";
import { errorHandle } from "../utils/errorHandle.js";

export const updateController = async (req, res, next) => {
  try {
    const updateUser = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    if (!updateUser) return next(errorHandle(404, "User not found!"));
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

export const deleteController = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(errorHandle(404, "User not found!"));
    res.status(200).json("User has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    if (!getUser) return next(errorHandle(404, "User not found!"));
    res.status(200).json(getUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController = async (req, res, next) => {
  try {
    const getAllUsers = await User.find();
    if (!getAllUsers) return next(errorHandle(404, "Users not found!"));
    res.status(200).json(getAllUsers);
  } catch (error) {
    next(error);
  }
};
