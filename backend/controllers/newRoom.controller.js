import User from "../models/user.model.js";
import Room from "../models/room.model.js";
import {uniqueRoomIdGenerator} from "../logic/uniqueRoomId.logic.js"

export const getRoom = async (req, res) => {
    {
        const { roomId, username } = req.body;
        // console.log(roomId);
        try {
            const room = await Room.findOne({ roomId });
            if (!room) {
                res.status(404).json({message: "Room Not Found"});
            }
            room.InRoom.push(username);
            res.status(200).json(user);
            // console.log("hit getRoom endpoint");
            // res.json({data: "You hit the getRoom endpoint"});
        } catch (error) {
            // console.error(error)
            console.log("Error in getRoom: ", error.message);
            res.status(500).json({error: error.message});
        }
    }
}
   
export const createRoom = async (req, res) => {
    {
        try {
            const {uName} =  req.body;
            if (!uName) {
                return res.status(400).json({ error: "UserId is required" });
            }

            const newUser = new User({
                UserId: uName,
            });
            console.log(newUser)
            await newUser.save();
            let uniqueRoomId = uniqueRoomIdGenerator();
            const newRoom = new Room({
                RoomId: uniqueRoomId,
                Owner: newUser._id,
            });
            await newRoom.save();
            res.status(201).json({RoomId: newRoom.RoomId, Owner: newRoom.Owner})
        } catch (error) {   
            console.log("Error in createRoom: ", error.message);
            res.status(500).json({error: error.message});
        } 
    }
}

export const deleteRoom = async (req, res) => {
    {
        try {
            const {roomId} = req.body;
            const room = await Room.deleteOne({ roomId});
            res.status(200).json({message: "Room deleted successfully"})
            // console.log("hit deleteRoom endpoint");
            // res.json({data: "You hit the deleteRoom endpoint"});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}