import { useNavigate } from "react-router-dom";

const JoinRoomPage = () => {
    const navigate = useNavigate();
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Room Code" 
            className="input input-bordered w-full max-w-xs"
          />
          <input 
            type="text" 
            placeholder="Username" 
            className="input input-bordered w-full max-w-xs"
          />
            <button 
            className="px-20 py-5 bg-green-500 text-white rounded-lg hover:bg-green-600" 
            onClick={() => navigate("/InRoomPage")}
          >
            Join Room
          </button>
        </div>
      </div>
    );
  };
  
  export default JoinRoomPage;
  