import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WaitlistComponent from "./common/components/waitlist.jsx";
import RoomDescription from "./common/components/roomDescription.jsx"

const InRoomPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { roomId, username } = location.state || {}; // Get the passed state from the previous page
    const myUsername = username;
    const currentRoomCode = roomId;

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-4 py-10 mt-10">
                <RoomDescription currentRoomCode={currentRoomCode} />
                <h1 className="text-center text-2xl">roomId: {roomId}</h1>
            </div>
        </div>
    )
}

export default InRoomPage;
