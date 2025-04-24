import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WaitlistComponent from "./common/components/waitlist.jsx";
import RoomDescription from "./common/components/roomDescription.jsx"
import HeaderComponent from "./common/components/header.jsx"
import "./common/css/style.css"

const InRoomPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { roomId, username } = location.state || {}; // Get the passed state from the previous page
    const myUsername = username;
    const currentRoomCode = roomId;

    return (
        <div>
            <div className="flex flex-col justify-center items-center flex-1 min-h-screen px-10">
                <div>
                    <RoomDescription currentRoomCode={currentRoomCode} />
                    <h1 className="text-center text-1xl mb-10">roomId: {roomId}</h1>
                    <div>
                        <div className="overflow-y-auto max-h-80 border border-gray-300 rounded-lg w-full">
                            <WaitlistComponent/>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center items-center">
                        <button className="good-button"> 
                            Join Waitlist 
                        </button>
                        <input 
                            type='text' 
                            placeholder="Question Number" 
                            className="border border-gray-300 rounded-lg px-4 py-5 ml-5"/>
                    </div>
                    <div className="mt-5 flex justify-center items-center">
                        <button className="leave-button" onClick={() => navigate("/")}>
                            Leave Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InRoomPage;
