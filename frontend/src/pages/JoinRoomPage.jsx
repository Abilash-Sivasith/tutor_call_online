import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const JoinRoomPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      roomCode: "",
      username: "",
    });

    const { mutate: joinRoomMutation, isError, isPending, error } = useMutation({
      mutationFn: async ({ roomCode, username }) => {
        const res = await fetch("/api/getRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomCode, username }),
        });
    
        if (!res.ok) {
          const errorData = await res.json(); // Try to get error details
          throw new Error(errorData?.message || "Failed to join the room");
        }
    
        return res.json(); // Ensure response is returned
      },
      onSuccess: () => {
        toast.success("Room joined successfully");
        navigate("/InRoomPage");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to join room");
      },
    });
    
    const handleSubmit = (e) => {
      e.preventDefault();
      joinRoomMutation(formData);
    };
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col gap-4">
          <input 
            type="text" 
            name="roomCode"
            placeholder="Room Code"
            onChange={handleInputChange}
            value={formData.roomCode} 
            className="input input-bordered w-full max-w-xs"
          />
          <input 
            type="text" 
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
            value={formData.username}
            className="input input-bordered w-full max-w-xs"
          />
          <button 
            className="px-20 py-5 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Joining..." : "Join Room"}
          </button>
        </div>
      </div>
    );
};

export default JoinRoomPage;
