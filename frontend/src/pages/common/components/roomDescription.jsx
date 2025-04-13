import { useState, useEffect } from "react";

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
            <h1 className="text-2xl text-center mb-5">Welcome to room: {roomDescription}</h1>
        </div>
    );
};

export default RoomDescription;