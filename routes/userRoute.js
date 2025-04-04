import express from "express";
import {
  updateController,
  deleteController,
  getUserController,
  getAllUsersController,
} from "../controllers/userController.js";

import { verifyAdmin, verifyUser } from "../utils/verfiyToken.js";

const router = express.Router();

// CREATE

// UPDATE
router.post("/:id", verifyUser, updateController);

// DELETE
router.delete("/:id", verifyUser, deleteController);

// GET BY ID
router.get("/:id", verifyUser, getUserController);

// GET ALL
router.get("/", verifyAdmin, getAllUsersController);

export default router;
