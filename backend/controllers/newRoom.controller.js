import User from "../models/user.model.js";
import Room from "../models/room.model.js";
import {uniqueRoomIdGenerator} from "../logic/uniqueRoomId.logic.js"

export const getRoom = async (req, res) => {
    try {
        const { roomId, username } = req.body;

        console.log(req.body)
        if (!roomId) {
            return res.status(400).json({ message: "Room ID not entered" });
        }
        if (!username) {
            return res.status(400).json({ message: "Username not entered" });
        }

        // const room = await Room.findOne({ RoomId: roomId });
        const room = await Room.findOneAndUpdate( {RoomId: roomId} ,{ $push: { InRoom: username } });

        console.log(room);

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // await Room.findOneAndUpdate( {RoomId: roomId} ,{ $push: { InRoom: username } });
        console.log(room);
        
        return res.status(200).json({
            RoomId: room.roomId,
            InRoom: room.InRoom,
            InWaitlist: room.InWaitlist,
        });

    } catch (error) {
        console.log("Error in getRoom: ", error.message);
        return res.status(500).json({ error: error.message });
    }
};
   
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