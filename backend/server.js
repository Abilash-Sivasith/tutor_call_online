// importing all packages

import express from "express";
import dotenv from "dotenv";

dotenv.config();

import newRoom from ".routes/newRoom.routes.js";

import connnectMongoDB from "./db/connnectMongoDB.js"