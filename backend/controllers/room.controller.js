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

export const getUserDetails = async (req, res) => {
    try {
        const username = req.query.username;
        const user = await User.findById(username);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });

    } catch (error) {
        console.log("Error in getUserDetails --> " + error);
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
/**
 * used when you join a room
 * @returns the room 
 */
export const joinInRoom = async (req, res) => {
    try {
        const { username, roomId } = req.body;
        let inRoom = await Room.findOne({ RoomId: roomId });
        if (!inRoom) {
            return res.status(404).json({ message: "Room not found" });
        }
        const user = await User.create({ UserId: username, inRoom: roomId });
        if (!user) {
            return res.status(404).json({ message: "Something went wrong making the user" });
        }

        // Add user to InRoom if not already present
        const updatedRoom = await Room.findOneAndUpdate(
            { RoomId: roomId }, 
            { $push: { InRoom: user._id } }, // Prevent duplicate entries
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

export const leaveRoom = async (req, res) => {
    try {
        const usersname = req.query.username;
        console.log("username in leaveRoom --> ", usersname);

        // Fetch the user based on the username
        const tempUser = await User.findOne({ UserId: usersname });

        if (!tempUser) {
            return res.status(404).json({ message: `User ${usersname} not found` });
        }

        // First, remove the user from the room's inRoom list
        const updatedRoom = await Room.findOneAndUpdate(
            { RoomId: tempUser.inRoom },  
            { $pull: { InRoom: tempUser._id } },
            { new: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found or user not in room" });
        }

        // Now, proceed to delete the user after being removed from the room
        const user = await User.findOneAndDelete({ UserId: usersname });

        if (!user) {
            return res.status(404).json({ message: `User ${usersname} deletion failed` });
        }

        // Send success response
        return res.status(200).json({
            room: updatedRoom,
            message: `User ${usersname} left room and was deleted successfully`
        });

    } catch (error) {
        console.log("Error in leaveRoom: ", error.message);
        return res.status(500).json({ error: error.message });
    }
}




export const joinInWaitlist = async (req, res) => {
    try {
        const { username, roomId } = req.body;
        console.log("roomId --> ", roomId);

        const user = await User.findOne({ UserId: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedRoom = await Room.findOneAndUpdate(
            { RoomId: roomId },
            { $push: { InWaitlist: user._id } },  // Removes user._id from InWaitlist
            { new: true } // Returns the updated document
        );

        user.PositionInList = updatedRoom.InWaitlist.length + 1;

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

        const user = await User.findOne({ UserId: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedRoom = await Room.findOneAndUpdate(
            { RoomId: roomId },  // Extracting RoomId correctly
            { $pull: { InWaitlist: user._id } },
            { new: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        return res.status(200).json({ message: "User joined the waitlist successfully -->", room: updatedRoom });

    } catch (error) {
        console.log("Error in leaveInWaitlist: ", error.message);
        return res.status(500).json({ error: error.message });
    }
};