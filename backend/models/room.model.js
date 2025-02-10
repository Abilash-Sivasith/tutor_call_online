import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        RoomId: {
            type: String,
            required: true,
            unique: true,
        },
        InRoom: [{
            type: String,  // Changed from ObjectId to String
            default: []
        }],
        InWaitlist: [{
            type: String,  // Changed from ObjectId to String
            default: []
        }]
    }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
