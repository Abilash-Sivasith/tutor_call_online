import User from "../models/user.model.js";
import Room from "../models/room.model.js";


export const getRoom = async (req, res) => {
    const { roomId } = req.params;
    // console.log(roomId);
    try {
        const room = await Room.findONe({ roomId });
        if (!room) {
            res.status(404).json({message: "Room Not Found"});
        }
        res.status(200).json(user);
        // console.log("hit getRoom endpoint");
        // res.json({data: "You hit the getRoom endpoint"});
    } catch (error) {
        // console.error(error)
        console.log("Error in getRoom: ", error.message);
        res.status(500).json({error: error.message});
    }
}
   

export const createRoom = async (req, res) => {
    try {
        console.log("hit createRoom endpoint");
        res.json({data: "You hit the createRoom endpoint"});
        // generate random 6 letter unique value
        // make this user the owner 

/*
        const newUser = new User({
            UserId: "asi1"
        });
        
        await newUser.save();
        console.log(newUser);

        console.log("---------------------");

        const newRoom = new Room({
            RoomId: "12345",
            Owner: newUser._id,
        });

        await newRoom.save()
        console.log(newRoom);
*/
    } catch (error) {   
        console.error(error)
    } 
}