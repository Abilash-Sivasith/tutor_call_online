import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WaitlistComponent from "./common/components/waitlist.jsx";
import RoomDescription from "./common/roomDescription.jsx";
import axios from "axios";
import InWaitListTable from "./InWaitlist.jsx";
import toast from "react-hot-toast";
import WaitlistButton from "../IsInWaitlistBtn.jsx";




const InRoomPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { roomId, username } = location.state;

    const [waitlist, setWaitlist] = useState([]);
    const [errorFlag, setErrorFlag] = useState(false); // TODO support error flag
    const [errorMessage, setErrorMessage] = useState(""); // TODO support error messages

    useEffect(() => {
        axios.get(`/api/getInWaitlist?RoomId=${roomId}`).then((res) => {
                const waitlistUserCodes = res.data.roomWaitlist;
                Promise.all(
                    waitlistUserCodes.map((userCode) =>
                        axios.get(`/api/getUserDetails?username=${userCode}`)
                            .then(res => res.data)  // extract the user data
                            .catch(err => {
                                console.error(`Error fetching user ${userCode}:`, err);
                                return null; // skip this user on error
                            })
                    )
                ).then(userDataList => {
                    const filtered = userDataList.filter(user => user !== null);
                    console.log("filtered data --> ", filtered ) // shows all the user data
                    setWaitlist(filtered);
                    setErrorFlag(false);
                }).catch((err) => {
                    setErrorFlag(true);
                    setErrorMessage(err.toString());
                });

        }).catch((err) => {
            setErrorFlag(true);
            setErrorMessage(err.toString);
        })
    }, [roomId]);


    function leaveRoomButton(username) {
        try {
            console.log("leaveRoomButton hit with username ", username)
            axios.post(`/api/leaveRoom?username=${username}`).then(() => {
                toast.success("you have left room ", roomId);
                navigate("/");
            }).catch((err) => {
                toast.error(err.toString());
            })  
        } catch (error) {
            return;
        }
    }

    
    async function currentUserInWaitlist(currentUsername) {
        console.log("waitlist ------> ", waitlist)
        if (waitlist.includes(currentUsername)) {
            return true;
        }
        return false;
    }

    
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col py-10 mt-5">
                <RoomDescription currentRoomCode={roomId} />
                <h1 className="text-center text-2xl">roomId: {roomId}</h1>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-3xl">
                {/* Scrollable pane */}
                <div className="overflow-y-auto max-h-80 border border-gray-300 rounded-lg w-full">
                    <InWaitListTable roomId={roomId}/>
                </div>
                {/* Join waitlist and leave waitlist btn */}
                <div>
                    <WaitlistButton username={username} currentUserInWaitlist={currentUserInWaitlist}/>
                </div>
                <div>
                    <button className="btn btn-error w-full" onClick={() => leaveRoomButton(username)}>Leave Room</button>
                </div>
            </div>
        </div>
    )
       

}

export default InRoomPage;
