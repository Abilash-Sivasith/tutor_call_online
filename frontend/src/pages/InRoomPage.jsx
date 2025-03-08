import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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

    function WaitlistComponent({ roomId }) {
        const [waitlist, setWaitlist] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          const fetchWaitlist = async () => {
            try {
              setLoading(true);
              // Make the API call to your endpoint
              const response = await fetch(`/api/getInWaitlist?RoomId=${currentRoomCode}`);
              
              if (!response.ok) {
                throw new Error('Failed to fetch waitlist');
              }
              
              const data = await response.json();
              setWaitlist(data.roomWaitlist);
            } catch (err) {
              setError(err.message);
              console.error('Error fetching waitlist:', err);
            } finally {
              setLoading(false);
            }
          };
      
          if (roomId) {
            fetchWaitlist();
          }
        }, [roomId]); // Re-fetch when roomId changes
      
        if (loading) return <p>Loading waitlist...</p>;
        if (error) return <p>Error: {error}</p>;
      
        return (
            <div className="waitlist-container">
              {waitlist.length === 0 ? (
                <p className="">No one is in the waitlist.</p>
              ) : (
                <table className="waitlist-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Person</th>
                      <th>Question</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.map((person, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{person}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        }        

    const isInList = tempUserList.some(entry => entry.username === myUsername);

    const [questionNumber, setQuestionNumber] = useState(""); // New state for question number input

    const addOrRemoveFromList = () => {
        if (isInList) {
            // Remove the user from the list
            setTempUserList(prevList => prevList.filter(user => user.username !== myUsername));
        } else {
            // Add the user to the list with the entered question number
            setTempUserList(prevList => [
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
                    <WaitlistComponent roomId={roomId} />
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