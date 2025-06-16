import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WaitlistComponent from "./common/components/waitlist.jsx";
import RoomDescription from "./common/roomDescription.jsx";
import axios from "axios";
import InWaitListTable from "./InWaitlist.jsx";
import toast from "react-hot-toast";




const InRoomPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { roomId, username } = location.state;



    async function leaveRoomButton(username) {
        try {
            axios.get(`/api/leaveRoom?username=${username}`).then((res) => {
                toast.success("you have left room ", roomId);
                navigate("/");
            }).catch((err) => {
                toast.error(err.toString());
            })  
        } catch (error) {
            return;
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col py-10 mt-5">
                <RoomDescription currentRoomCode={roomId} />
                <h1 className="text-center text-2xl">roomId: {roomId}</h1>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-3xl">
                {/* Scrollable pane */}
                <div className="overflow-y-auto max-h-80 border border-gray-300 rounded-lg w-full">
                    <InWaitListTable roomId={roomId}/>
                </div>
                <div>
                    <button className="btn btn-error w-full" onClick={() => leaveRoomButton(username)}>Leave Room</button>
                </div>
            </div>
        </div>
    )
       

}

export default InRoomPage;
