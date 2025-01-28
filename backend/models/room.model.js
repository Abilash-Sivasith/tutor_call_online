import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        RoomId : {
            type: String,
            required: true,
            unique: true,
        },
        Owner: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        InRoom: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: []
        },
        InWaitlist: {
            type: mongoose.Types.ObjectId,
            ref : "User",
            default : []
        }
    });

const Room = mongoose.model("Room", roomSchema);
export default Room;