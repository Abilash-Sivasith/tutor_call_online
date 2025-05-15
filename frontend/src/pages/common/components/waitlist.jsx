  import React, { useEffect, useState } from 'react';
  import "../../common/css/waitlist.css";

  function WaitlistComponent({ username, roomId }) {

    const [waitlist, setWaitlist] = useState([])
    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
      getInWaitlist()
    }, [])

    const getInWaitlist = async () => {
      try {
        const response = await fetch(`/api/getInWaitlist?RoomId=${roomId}`, {
          method: "GET"
        });
    
        if (!response.ok) {
          throw new Error("something went wrong fetching the waitlist");
        }
    
        const data = await response.json();
        console.log("data ---> ", data.roomWaitlist);
        setWaitlist(data.roomWaitlist);
      } catch (error) {
        setErrorFlag(true);
        setErrorMessage(error.toString());
      }
    };

    {/* th is the table header cell (name on the column) */}
    {/* td is table data cells (exact values to put into that columns)*/}

    const list_of_users = () => {
      return waitlist.map((item) => {
        return (
          <tr key={item._id}>
            <th scope="row">{item.username}</th>
          </tr>
        );
      });
    }
    
    if (errorFlag) {
      return (
        <div>
          <div>{errorMessage}</div>
        </div>
      )
    } else {
      return (
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>position</th>
                <th scope='col'>Name</th>
              </tr>
            </thead>
            <tbody>
              {list_of_users()}
            </tbody>
          </table>
        </div>
      )
    };
  }  
export default WaitlistComponent;
