import express from "express";
import {createRoom} from "../controllers/newRoom.controller.js";

const router = express.Router();

router.post("/newRoom", newRoom);
router.get("/getRoom", getRoom);

export default router;