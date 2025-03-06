import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const InRoomPage = () => {
    const navigate = useNavigate();


    const location = useLocation();
    const { roomId, username } = location.state || {}; // Get the passed state from the previous page
    const myUsername = username;
    const currentRoomCode = roomId;

        // loads actual users into the table
        const [userList, setUserList] = useState([]);
        useEffect(() => {
            const fetchUserList = async () => {
                try {
                    const response = await fetch(`/api/getInRoomList?RoomId=${currentRoomCode}`);
                    if (!response.ok) {
                        throw new Error('Room not found');
                    }
                    const data = await response.json();
                    setUserList(data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchUserList();
        }, [currentRoomCode]);
    

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
            fetchRoomDescription();
        }); // Only run when currentRoomCode changes

        if (error) {
            return <div>Error: {error}</div>;
        }
    
        return (
            <div>
                <h1 className="text-2xl text-center">{roomDescription}</h1>
            </div>
        );
    };

    console.log(userList);

    const isInList = function (userList, myUsername) {
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username === myUsername) {
                return true;
            }
        }
        return false;
    }
    const [questionNumber, setQuestionNumber] = useState(""); // New state for question number input

    const addOrRemoveFromList = () => {
        if (isInList) {
            // Remove the user from the list
            userList(prevList => prevList.filter(user => user.username !== myUsername));
        } else {
            // Add the user to the list with the entered question number
            userList(prevList => [
                ...prevList,
                { username: myUsername, question: questionNumber || "No question" } // Default if no question is entered
            ]);
        }
        setQuestionNumber(""); // Clear the input after adding or removing
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-4 py-10 mt-10">
                <RoomDescription currentRoomCode={currentRoomCode}/>
                <h1 className="text-center text-2xl">roomId: {roomId}</h1>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-3xl">
                {/* Scrollable pane with a wider table */}
                <div className="overflow-y-auto max-h-80 border border-gray-300 rounded-lg w-full">
                    <table className="table w-full min-w-[600px]">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Question</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((entry, index) => (
                                <tr 
                                    key={index}
                                    className={entry.username === myUsername ? "bg-blue-100" : ""}
                                >
                                    <th>{index + 1}</th>
                                    <td>{entry.username}</td>
                                    <td>{entry.question}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Flex container for Join/Leave button and Question Number input */}
                <div className="flex gap-4 items-center w-full">
                    <button 
                        className={`px-20 h-12 text-white rounded-lg whitespace-nowrap ${isInList ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600"}`}
                        onClick={addOrRemoveFromList}
                    >
                        {isInList ? "Leave List" : "Join List"}
                    </button>

                    <input 
                        type="text"
                        placeholder="Enter Question"
                        value={questionNumber}
                        onChange={(e) => setQuestionNumber(e.target.value)}
                        className="input input-bordered w-full max-w-3xl h-12" 
                    />
                </div>
                <button className="px-20 py-5 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={() => navigate("/")}>
                    Leave Room
                </button>
            </div>

            <div className="flex gap-5">

            </div>
        </div>
    );
};

export default InRoomPage;
