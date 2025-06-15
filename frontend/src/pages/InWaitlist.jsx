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

    return (
        <div className='waitlist-container text-center'>
            {usersInWaitlist.length  === 0 ? (
                <p> Wait for people to join the waitlist</p>
            ) : (
                <table className="waitlist-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Person</th>
              <th>Question</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {waitlist.map((person, index) => {
              // console.log("userDetais about person--> ", userDetails[person]);
              const user = userDetails[person];
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
            )}
        </div>
    );
}

export default InWaitListTable;