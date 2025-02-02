import { useNavigate } from "react-router-dom";

const homePage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" 
                              onClick={() => navigate("/CreateRoomPage")}>
              Create Room
            </button>
            <button className="px-10 py-5 bg-green-500 text-white rounded-lg hover:bg-green-600"
                              onClick={() => navigate("/JoinRoomPage")}>
              Join Room
            </button>
          </div>
        </div>
      );
 }
 
 export default homePage;