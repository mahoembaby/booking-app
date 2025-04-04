import Hotel from "../models/Hotel.js";
import { errorHandle } from "../utils/errorHandle.js";

export const createController = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const saveHotel = await newHotel.save();
    return res.status(201).json(saveHotel);
  } catch (error) {
    next(error);
  }
};

export const updateController = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    if (!updateHotel) return next(errorHandle(404, "Hotel not found!"));
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteController = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return next(errorHandle(404, "Hotel not found!"));
    res.status(200).json("Hotel has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getHotelController = async (req, res, next) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);
    if (!getHotel) return next(errorHandle(404, "Hotel not found!"));
    res.status(200).json(getHotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotelsController = async (req, res, next) => {
  try {
    const getAllHotels = await Hotel.find();
    if (!getAllHotels) return next(errorHandle(404, "Hotels not found!"));
    res.status(200).json(getAllHotels);
  } catch (error) {
    next(error);
  }
};
