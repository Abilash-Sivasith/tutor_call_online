import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WaitlistComponent from "./common/components/waitlist.jsx";
import RoomDescription from "./common/roomDescription.jsx";
import axios from "axios";



const InRoomPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { roomId, username } = location.state || {}; // Get the passed state from the previous page

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-4 py-10 mt-10">
                <RoomDescription currentRoomCode={roomId} />
                <h1 className="text-center text-2xl">roomId: {roomId}</h1>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-3xl">
                {/* Scrollable pane */}
                <div className="overflow-y-auto max-h-80 border border-gray-300 rounded-lg w-full">
                    {/* add waitlist here*/}
                </div>
            </div>
        </div>
    )
       

}

export default InRoomPage;
