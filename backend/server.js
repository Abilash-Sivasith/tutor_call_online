import express from "express";
import dotenv from "dotenv";

dotenv.config();

import connnectMongoDB from './db/connectMongoDB.js';

const app = express();
const PORT = process.env.PORT || 2142;

app.use(express.json()) // to parse req.body (middle layer)
app.use(express.urlencoded({extended: true})); //  to parse form data(urlencoded)

import {createRoom, getRoom, deleteRoom} from "./controllers/newRoom.controller.js";
import { getInWaitlist, getInRoomList, getRoomDescription, joinInRoom, joinInWaitlist, leaveInWaitlist, getUserDetails, leaveRoom } from "./controllers/room.controller.js";

const router = express.Router();

router.post("/createRoom", createRoom);
router.post("/getRoom", getRoom); 
router.post("/createRoom", createRoom);
router.post("/getRoom", getRoom);
router.post("/deleteRoom/:roomId", deleteRoom)
router.get("/getInWaitlist", getInWaitlist);
router.get("/getInRoomList", getInRoomList);
router.get("/getUserDetails", getUserDetails);
router.get("/getRoomDescription", getRoomDescription)
router.post("/joinInRoom", joinInRoom); // adds a User to the inRoom list
router.post("/joinInWaitlist", joinInWaitlist); // add a User to the room waitlist
router.post("/leaveInWaitlist", leaveInWaitlist); // remove a User from the room waitlist  
router.post("/leaveRoom", leaveRoom); // used to remove the user from the db when you leave a room

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connnectMongoDB();
})
