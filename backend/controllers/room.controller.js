import Room from "../models/room.model.js";
import User from "../models/user.model.js";

// This function assumes that you want to get the users in the InWaitlist.
export const getInWaitlist = async (req, res) => {
    try {
        // console.log(req.query);
        const roomCode = req.query.RoomId;

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

export const joinInRoom = async (req, res) => {
    try {
        const { username, roomId } = req.body;
        let doesUsernameAlreadyExist = await User.findOne({ UserId: username});
        if (doesUsernameAlreadyExist) {
            return res.status(400).json({ message: "User already exists in this room. Please select a new username" });
        }
        const user = await User.create({ UserId: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add user to InRoom if not already present
        const updatedRoom = await Room.findOneAndUpdate(
            { RoomId: roomId }, 
            { $addToSet: { InRoom: user._id } }, // Prevent duplicate entries
            { new: true } // Return updated room
        ).populate("InRoom"); // Populate InRoom with user details

        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        return res.status(200).json({
            RoomId: updatedRoom.roomId,
            RoomDescription: updatedRoom.RoomDescription,
            InRoom: updatedRoom.InRoom,
            InWaitlist: updatedRoom.InWaitlist,
        });
    } catch (error) {
        console.log("Error in getRoom: ", error.message);
        return res.status(500).json({ error: error.message });
    }
}

export const joinInWaitlist = async (req, res) => {
    try {
        const { username, roomId } = req.body;
        const user = await User.findOne({ UserId: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedRoom = await Room.findOneAndUpdate(
            { RoomId: roomId },
            { $pull: { InWaitlist: user._id } },  // Removes user._id from InWaitlist
            { new: true } // Returns the updated document
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        return res.status(200).json({ message: "User joined the waitlist successfully -->", room: updatedRoom });
        
    } catch (error) {
        console.log("Error in joinInWaitlist: ", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export const leaveInWaitlist = async (req, res) => {
    try {
        const { username, roomId } = req.body;
        if (!username || !roomId) {
            return res.status(400).json({ message: "Username and Room ID are required" });
        }

        console.log("Username -->", username);
        console.log("RoomId -->", roomId);

        const user = await User.findOne({ UserId: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedRoom = await Room.findOneAndUpdate(
            { RoomId: roomId },  // Extracting RoomId correctly
            { $pull: { InWaitlist: user._id } },
            { new: true }
        );

        console.log("Updated Room -->", updatedRoom);
        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        return res.status(200).json({ message: "User joined the waitlist successfully -->", room: updatedRoom });

    } catch (error) {
        console.log("Error in leaveInWaitlist: ", error.message);
        return res.status(500).json({ error: error.message });
    }
};