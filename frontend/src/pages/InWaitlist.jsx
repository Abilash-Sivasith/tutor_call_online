import axios from 'axios'
import { useEffect, useState } from 'react'

function InWaitListTable({roomId}) {

    const [usersInWaitlist, setUsersInWaitlist] = useState([]);
    const [errorFlag, setErrorFlag] = useState(false); // TODO add support for erroflag and errorMsg when things go
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios.get(`/api/getInWaitlist?RoomId=${roomId}`)
            .then((res) => {
                const waitlistUserCodes = res.data.roomWaitlist;

                // Fetch all user details in parallel
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
                    setUsersInWaitlist(filtered);
                    setErrorFlag(false);
                }).catch((err) => {
                    setErrorFlag(true);
                    setErrorMessage(err.toString());
                });
            })
            .catch((err) => {
                setErrorFlag(true);
                setErrorMessage(err.toString());
            });
    }, [roomId]); //TODO update the waitlist when the join/leave waitlist btn is hit


return (
        <div>
    <div>
        <div    >
        {usersInWaitlist.length === 0 ? (
            <p>Wait for people to join the waitlist</p>
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
                {usersInWaitlist.map((person, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{person.user.UserId}</td>
                    <td>{person.user.Question}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    </div>
    </div>
);

}

export default InWaitListTable;