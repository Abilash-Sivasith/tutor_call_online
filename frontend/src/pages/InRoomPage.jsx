import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WaitlistComponent from "./common/components/waitlist.jsx";
import RoomDescription from "./common/components/roomDescription.jsx"
import HeaderComponent from "./common/components/header.jsx"

const InRoomPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { roomId, username } = location.state || {}; // Get the passed state from the previous page
    const myUsername = username;
    const currentRoomCode = roomId;

    return (
        <div>
            <div className="flex-col justify-center items-center flex-1 min-h-screen">
                <div className="gap-4 py-10 mt-10">
                    <RoomDescription currentRoomCode={currentRoomCode} />
                    <h1 className="text-center text-1xl mb-10">roomId: {roomId}</h1>
                    <div>
                        {/* Scrollable pane with a wider table */}
                        <div className="overflow-y-auto max-h-80 border border-gray-300 rounded-lg w-full">
                            <WaitlistComponent/>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InRoomPage;
