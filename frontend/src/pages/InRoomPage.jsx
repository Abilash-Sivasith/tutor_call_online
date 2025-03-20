import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WaitlistComponent from "./common/components/waitlist.jsx";

const InRoomPage = () => {
    const navigate = useNavigate();

    // Use state to track the user list
    const [tempUserList, setTempUserList] = useState([
        { username: "asi160", question: "3a" },
        { username: "lhe145", question: "3c" },
        { username: "jkl123", question: "1b" },
        { username: "xyz789", question: "2d" },
        { username: "pqr456", question: "5e" },
        { username: "uvw111", question: "6f" },
        { username: "stu222", question: "7g" },
        { username: "vwx333", question: "8h" }, // 8th item (triggers scrolling)
    ]);

    const location = useLocation();
    const { roomId, username } = location.state || {}; // Get the passed state from the previous page
    const myUsername = username;
    const currentRoomCode = roomId;

    // Fetch room description component
    const RoomDescription = ({ currentRoomCode }) => {
        const [roomDescription, setRoomDescription] = useState('');
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchRoomDescription = async () => {
                try {
                    const response = await fetch(`/api/getRoomDescription?RoomId=${currentRoomCode}`);
                    if (!response.ok) {
                        throw new Error('Room not found');
                    }
                    const data = await response.json();
                    setRoomDescription(data.roomTitle); // Save room description
                } catch (error) {
                    setError(error.message);
                }
            };

            // Only run when currentRoomCode changes
            if (currentRoomCode) {
                fetchRoomDescription();
            }
        }, [currentRoomCode]); // Added dependency array to run only on room code change

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div>
                <h1 className="text-2xl text-center">{roomDescription}</h1>
            </div>
        );
    };

    // Check if user is already in the list
    const isInList = tempUserList.some(entry => entry.username === myUsername);

    const [questionNumber, setQuestionNumber] = useState(""); // New state for question number input

    const addOrRemoveFromList = async () => {
        if (isInList) {
            // Remove the user from the list
            setTempUserList(prevList => prevList.filter(user => user.username !== myUsername));
            
            // Make the API call to leave the waitlist
            try {
                const response = await fetch('/api/leaveWaitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: myUsername,
                        roomId: roomId,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('User left the waitlist:', data);
                } else {
                    console.error('Error:', data.message || 'An error occurred');
                }
            } catch (error) {
                console.error('Error in leaving the waitlist:', error.message);
            }
        } else {
            // Validate question number before adding
            if (!questionNumber.trim()) {
                alert("Please enter a valid question number.");
                return;
            }

            // Add the user to the list with the entered question number
            setTempUserList(prevList => [
                ...prevList,
                { username: myUsername, question: questionNumber || "No question" } // Default if no question is entered
            ]);
            
            // Make the API call to join the waitlist
            try {
                const response = await fetch('/api/joinInWaitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: myUsername,
                        roomId: roomId,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('User joined the waitlist:', data);
                } else {
                    console.error('Error:', data.message || 'An error occurred');
                }
            } catch (error) {
                console.error('Error in joining the waitlist:', error.message);
            }
        }

        setQuestionNumber(""); // Clear the input after adding or removing
    };

    const leaveRoom = async (username) => {
        try {
            const res = await fetch(`/api/leaveRoom?username=${username}`, {method: 'POST'});
            if (!res.ok) {
                throw new Error("Error in deleting user");
            }
            navigate("/");
        } catch (error) {
            return;
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-4 py-10 mt-10">
                <RoomDescription currentRoomCode={currentRoomCode} />
                <h1 className="text-center text-2xl">roomId: {roomId}</h1>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-3xl">
                {/* Scrollable pane with a wider table */}
                <div className="overflow-y-auto max-h-80 border border-gray-300 rounded-lg w-full">
                    <WaitlistComponent username={username} roomId={roomId} />
                </div>

                {/* Flex container for Join/Leave button and Question Number input */}
                <div className="flex gap-4 items-center w-full">
                    <button 
                        className={`px-20 h-12 text-white rounded-lg whitespace-nowrap ${isInList ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600"}`}
                        onClick={addOrRemoveFromList}
                    >
                        {isInList ? "Leave Waitlist" : "Join Waitlist"}
                    </button>

                    <input 
                        type="text"
                        placeholder="Enter Question"
                        value={questionNumber}
                        onChange={(e) => setQuestionNumber(e.target.value)}
                        className="input input-bordered w-full max-w-3xl h-12" 
                    />
                </div>
                <button className="px-20 py-5 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={() => leaveRoom(username)}>
                    Leave Room
                </button>
            </div>
        </div>
    );
};

export default InRoomPage;
