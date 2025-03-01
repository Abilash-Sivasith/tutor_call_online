import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const JoinRoomPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      roomId: "",
      username: "",
    });

    const { mutate: joinRoomMutation, isError, isPending, error } = useMutation({
      mutationFn: async ({ roomId, username }) => {
        const res = await fetch("/api/getRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomId, username }),
        });
    
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.message || "Failed to join the room");
        }
    
        return res.json();
      },
      onSuccess: () => {
        toast.success("Room joined successfully");
        navigate("/InRoomPage", { state: { roomId: formData.roomId, username: formData.username } });
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
      <div className="flex justify-center items-center h-screen">
        {/* Ensure the container width is not too large and center content */}
        <div className="flex flex-col gap-6 w-full max-w-md p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name="roomId"
              placeholder="Room Code"
              onChange={handleInputChange}
              value={formData.roomId} 
              className="input input-bordered w-full"
            />
            <input 
              type="text" 
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
              value={formData.username}
              className="input input-bordered w-full"
            />
            <button 
              type="submit"
              className='btn rounded-full btn-primary text-white w-full'
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Join Room"}
            </button>
          </form>
        </div>
      </div>
    );
};

export default JoinRoomPage;
