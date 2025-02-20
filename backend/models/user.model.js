import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        UserId: {
            type: String,
            required: true,
            unique: true,
        },
        timeInList: { 
            type: Number, 
            default: () => Date.now() } 
    });
    
const User = mongoose.model("User", UserSchema);

export default User;