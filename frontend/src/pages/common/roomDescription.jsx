import axios from 'axios'
import { useState } from 'react'

function RoomDescription({roomId : string}) {
    const [roomDescription, setRoomDescription] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    React.useEffect(() => {
        if (!roomId) {
            return;
        }
        axios.get(`/api/getRoomDescription?RoomId=${currentRoomCode}`).then((res) => {
            setRoomDescription(res.roomTitle);
            setErrorFlag(false);
        }).catch((err) => {
            setErrorFlag(true);
            setErrorMessage(err.toString());
        })
    }, [roomId]);

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