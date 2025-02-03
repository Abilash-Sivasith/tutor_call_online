import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex   flex-col justify-center items-center h-screen">
      <div className="text-white py-10 font-mono text-4xl">
      WELCOME TO TUTOR CALL ONLINE
      </div>
        <div className="flex gap-5">
          <button 
            className="px-20 py-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600" 
            onClick={() => navigate("/CreateRoomPage")}
          >
            Create Room
          </button>
          <button 
            className="px-20 py-5 bg-green-500 text-white rounded-lg hover:bg-green-600" 
            onClick={() => navigate("/JoinRoomPage")}
          >
            Join Room
          </button>
        </div>

    </div>
  );
};

export default HomePage;