import User from "../models/user.model.js";
import Room from "../models/room.model.js";


export const getRoom = async (req, res) => {
    const { roomId } = req.params;
    // console.log(roomId);
    try {
        console.log("hit getRoom endpoint");
        res.json({data: "You hit the getRoom endpoint"});
    } catch (error) {
            console.error(error)
    }
}
   

export const createRoom = async (req, res) => {
    try {
        console.log("hit createRoom endpoint");
        res.json({data: "You hit the createRoom endpoint"});

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