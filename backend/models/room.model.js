import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        RoomId: {
            type: String,
            required: true,
            unique: true,
        },
        RoomDescription: {
            type: String
        },
        RoomOwner: {
            type: String
        },
        InRoom: [{
            type: String,
            default: []
        }],
        InWaitlist: [{
            type: String,
            default: []
        }]
    }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
