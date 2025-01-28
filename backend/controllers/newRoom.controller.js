

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
    } catch (error) {   
        console.error(error)
    } 
}