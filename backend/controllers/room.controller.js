import Room from "../models/room.model.js";

// This function assumes that you want to get the users in the InWaitlist.
export const getInWaitlist = async (req, res) => {
    try {
        // console.log(req.query);
        const roomCode = req.query.RoomId;
        console.log("The roomCode is --> " + roomCode);

        const room = await Room.findOne({ RoomId: roomCode });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        // console.log("Room -->" + room);

        const roomWaitlist = room.InWaitlist;
        // console.log("Waitlist in " + roomCode + " is " + roomWaitlist);

        return res.status(200).json({ roomWaitlist });

    } catch (error) {
        console.log("Error in getRoomInWaitlist --> " + error);
        return res.status(500).json({ error: error.message });
    }
}

export const getInRoomList = async (req, res) => {
    try {
        const roomCode = req.query.RoomId;
        console.log("The roomCode is --> " + roomCode);

        const room = await Room.findOne({ RoomId: roomCode });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        const roomList = room.InRoom;

        return res.status(200).json({ roomWaitlist: roomList });

    } catch (error) {
        console.log("Error in getRoomInWaitlist --> " + error);
        return res.status(500).json({ error: error.message });
    }
}

export const getRoomDescription = async (req, res) => {
    try {
        const roomCode = req.query.RoomId;
        // console.log("The roomCode is --> " + roomCode);

        const room = await Room.findOne({ RoomId: roomCode });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        const roomDescrption = room.RoomDescription;
        return res.status(200).json({roomTitle: roomDescrption });


    } catch (error) {
        console.log("Error in getRoomDescription --> " + error);
        return res.status(500).json({ error: error.message });
    }
}