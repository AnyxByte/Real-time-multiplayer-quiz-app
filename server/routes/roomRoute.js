import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getRoom);
router.post("/create", createRoom);
router.delete("/delete/:id", deleteRoom);

export default router;
