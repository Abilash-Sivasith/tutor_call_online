import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        RoomId : {
            type: String,
            required: true,
            unique: true,
        },
        Owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        InRoom: [{
            type: mongoose.Schema.Types.ObjectId,  // Array of ObjectIds
            ref: "User",
            default: []
        }],
        InWaitlist: [{
            type: mongoose.Schema.Types.ObjectId,  // Array of ObjectIds
            ref: "User",
            default: []
        }]
    });

const Room = mongoose.model("Room", roomSchema);
export default Room;