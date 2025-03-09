import Room from "../models/room.model.js";
import {uniqueRoomIdGenerator} from "../logic/uniqueRoomId.logic.js"

export const getRoom = async (req, res) => {
    try {
        const { roomId, username } = req.body;

        if (!roomId) {
            return res.status(400).json({ message: "Room ID not entered" });
        }

        if (!username) {
            return res.status(400).json({ message: "Username not entered" });
        }

        const room = await Room.findOne({ RoomId: roomId });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        
        return res.status(200).json({
            RoomId: room.roomId,
            RoomDescription: room.RoomDescription,
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
            const {userName, roomTitle } =  req.body;
            if (!userName) {
                return res.status(400).json({ error: "UserId is required" });
            }
            if (!roomTitle) {
                return res.status(400).json({error: "roomTitle is requied"});
            }

            let uniqueRoomId = uniqueRoomIdGenerator();
            const newRoom = new Room({
                RoomId: uniqueRoomId,
                Owner: userName,
                RoomDescription: roomTitle,
            });

            console.log(newRoom);
            await newRoom.save();
            console.log(newRoom)
            return res.status(201).json({userName: userName, roomTitle: roomTitle});
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
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}