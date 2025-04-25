import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WaitlistComponent from "./common/components/waitlist.jsx";
import RoomDescription from "./common/components/roomDescription.jsx"
import HeaderComponent from "./common/components/header.jsx"
import "./common/css/style.css"
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const InRoomPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { roomId, username } = location.state || {}; // Get the passed state from the previous page
    const myUsername = username;
    const currentRoomCode = roomId;

    const [question, setQuestion] = useState({
        question: ""
    });

    const {mutate: questionMutation, isError, isPending, error} = useMutation({
        mutationFn: async ({question}) => {
            const res = await fetch("/api/joinInWaitlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, roomId, question})
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.message || "Failed to join waitlist"); // the data?.message syntax is a safe ways of saying “If data exists, get data.message; otherwise, just return undefined.”
            }
            return data;
        }, 
        onSuccess: () => {
            toast.success("Waitlist joined successfully");
        },
        OnError: (error) => {
            toast.error(error.message || "Something went wrong when trying to join list");
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        questionMutation(question) // this is the question in the const [question, setQuestion]
    };

    const handleInputChange = (event) => {
        setQuestion({question: event.target.value})
    }

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
                        <button 
                            className="good-button"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isPending}
                        > 
                            {isPending ? "Loading..." : "Join Wishlist"}
                        </button>
                        <input 
                            type='text' 
                            onChange={handleInputChange}
                            value= {question.question}
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
