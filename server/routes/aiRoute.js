import express from "express";
import { aiController } from "../controllers/aiController.js";

const router = express.Router();

router.get("/", aiController);

export default router;
