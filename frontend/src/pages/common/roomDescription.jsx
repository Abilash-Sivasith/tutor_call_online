import axios from 'axios'
import { useState, useEffect } from "react";

function RoomDescription({currentRoomCode}) {
    const [roomDescription, setRoomDescription] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!currentRoomCode) {
            return;
        }
        axios.get(`/api/getRoomDescription?RoomId=${currentRoomCode}`).then((res) => {
            setRoomDescription(res.data.roomTitle);
            setErrorFlag(false);
        }).catch((err) => {
            setErrorFlag(true);
            setErrorMessage(err.toString());
        })
    }, [currentRoomCode]);

    if (errorFlag) {
        return <span style={{ color: "red" }}>{errorMessage}</span>;
    } else {
        return (
            <div>
                <h1 className="text-2xl text-center">{roomDescription}</h1>
            </div>
        ); 
    }

}

export default RoomDescription