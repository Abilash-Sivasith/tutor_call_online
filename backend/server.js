// importing all packages

import express from "express";
import dotenv from "dotenv";

dotenv.config();

import connnectMongoDB from './db/connectMongoDB.js';

const app = express();
const PORT = process.env.PORT || 2142;

app.use(express.json()) // to parse req.body (middle layer)
app.use(express.urlencoded({extended: true})); //  to parse form data(urlencoded)

import {createRoom} from "./controllers/newRoom.controller.js";

const router = express.Router();

router.post("/createRoom", createRoom);

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connnectMongoDB();
})
