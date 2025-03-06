import express from "express";
import dotenv from "dotenv";

dotenv.config();

import connnectMongoDB from './db/connectMongoDB.js';

const app = express();
const PORT = process.env.PORT || 2142;

app.use(express.json()) // to parse req.body (middle layer)
app.use(express.urlencoded({extended: true})); //  to parse form data(urlencoded)

import {createRoom, getRoom, deleteRoom} from "./controllers/newRoom.controller.js";
import { getInWaitlist, getInRoomList, getRoomDescription, joinInRoom } from "./controllers/room.controller.js";

const router = express.Router();

router.post("/createRoom", createRoom); // when creating a new room
router.post("/getRoom", getRoom); // when joining room
router.post("/deleteRoom/:roomId", deleteRoom)
router.get("/getInWaitlist", getInWaitlist);
router.get("/getInRoomList", getInRoomList);
router.get("/getRoomDescription", getRoomDescription)
router.post("/joinInRoom", joinInRoom);

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connnectMongoDB();
})
