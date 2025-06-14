import axios from 'axios'
import { useEffect, useState } from 'react'

function InWaitListTable({roomId : string}) {

    [usersInWaitlist, setUsersInWaitlist] = useState([]);
    [individualUserInfo, setIndividualUserInfo] = useState({})
    [errorFlag, setErrorFlag] = useState(false);
    [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios.get(`/api/getInWaitlist?RoomId=${roomId}`).then((res) => {
            setUsersInWaitlist(res.roomWaitlist);
            setErrorFlag(false);
        }).catch((err) => {
            setErrorFlag(true);
            setErrorMessage(err.toString());
        })
    }, [roomId])

    const fetchUserDetails = async (userId) => {
        axios.get(`/api/getUserDetails?username=${userId}`).then((res)=> {
            setIndividualUserInfo(res.json().user);
        }).catch((err) => {
            console.log("Something went wrong when updating the indvidual user records --> ", err.toString());
        })
    }

    async function fetchAllUserDetails(){
        for (const user of waitlist) {
            await fetchUserDetails(user);
        }
    }

    useEffect(() => {
        if (waitlist.length > 0) {
            fetchAllUserDetails();
        }
    }, [waitlist])

}

export default InWaitListTable;