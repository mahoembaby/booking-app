import express from "express";

import {
  createController,
  updateController,
  deleteController,
  getHotelController,
  getAllHotelsController,
} from "../controllers/hotelController.js";

import { verifyAdmin } from "../utils/verfiyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createController);

// UPDATE
router.post("/:id", verifyAdmin, updateController);

// DELETE
router.delete("/:id", verifyAdmin, deleteController);

// GET BY ID
router.get("/:id", getHotelController);

// GET ALL
router.get("/", getAllHotelsController);

export default router;
