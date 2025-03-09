import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        UserId: {
            type: String,
            required: true,
            unique: true,
        },
        Question: { 
            type: String, 
            default: null,
        } 
    });
    
const User = mongoose.model("User", UserSchema);

export default User;