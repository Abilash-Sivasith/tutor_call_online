import { useNavigate } from "react-router-dom";
import { useState } from "react";

const InRoomPage = () => {
    const navigate = useNavigate();

    // Use state to track the user list
    const [tempUserList, setTempUserList] = useState([
        { username: "asi160", question: "3a", time: 1000 },
        { username: "lhe145", question: "3c", time: 2000 },
        { username: "jkl123", question: "1b", time: 3000 },
        { username: "xyz789", question: "2d", time: 4000 },
        { username: "pqr456", question: "5e", time: 5000 },
        { username: "uvw111", question: "6f", time: 6000 },
        { username: "stu222", question: "7g", time: 7000 },
        { username: "vwx333", question: "8h", time: 8000 }, // 8th item (triggers scrolling)
    ]);

    let myUsername = "lhe145";

    const isInList = tempUserList.some(entry => entry.username === myUsername);

    const addOrRemoveFromList = () => {
        if (isInList) {
            // Remove the user from the list
            setTempUserList(prevList => prevList.filter(user => user.username !== myUsername));
        } else {
            // Add the user to the list
            setTempUserList(prevList => [...prevList, { username: myUsername, question: "9i", time: 120 }]);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-4 py-10 mt-10">
                <h1 className="text-2xl">Welcome to InRoomPage</h1>
            </div>
            <div className="flex flex-col gap-4 py-10 w-full max-w-3xl">
                {/* Scrollable pane with a wider table */}
                <div className="overflow-y-auto max-h-64 border border-gray-300 rounded-lg w-full">
                    <table className="table w-full min-w-[600px]">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Question</th>
                                <th>Time In List (mins)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tempUserList.map((entry, index) => (
                                <tr 
                                    key={index}
                                    className={entry.username === myUsername ? "bg-blue-100" : ""}
                                >
                                    <th>{index + 1}</th>
                                    <td>{entry.username}</td>
                                    <td>{entry.question}</td>
                                    <td>{Math.round(entry.time / 60)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button 
                    className={`px-20 py-5 text-white rounded-lg ${isInList ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600"}`}
                    onClick={addOrRemoveFromList}
                >
                    {isInList ? "Leave List" : "Join List"}
                </button>
            </div>
            <div className="flex gap-5">
                <button 
                    className="px-20 py-5 bg-red-500 text-white rounded-lg hover:bg-red-600" 
                    onClick={() => navigate("/")}
                >
                    Leave Room
                </button>
            </div>
        </div>
    );
};

export default InRoomPage;
