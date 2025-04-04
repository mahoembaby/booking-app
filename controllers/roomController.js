import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { errorHandle } from "../utils/errorHandle.js";

export const createRoomController = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    try {
      if (!savedRoom) return next(errorHandle(404, "Room not found"));

      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomController = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailabilityController = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteRoomController = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelid;
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoomController = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return next(errorHandle(404, "Room not found"));
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRoomsController = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    if (!rooms) return next(errorHandle(404, "Rooms not found"));
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
