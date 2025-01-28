
/*
export const getRoom = async (requestAnimationFrame, res) => {
   try {
    res.json({data: "You hit the logout endpoint"});
   } catch (error) {
    console.error(error)
   }
}
   */

export const createRoom = async (req, res) => {
    try {
        console.log("hit createRoom endpoint");
        res.json({data: "You hit the createRoom endpoint"});
    } catch (error) {   
        console.error(error)
    } 
}