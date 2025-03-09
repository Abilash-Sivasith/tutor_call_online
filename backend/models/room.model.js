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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
        InWaitlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }]
    }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
