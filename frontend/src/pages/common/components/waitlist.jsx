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
        setWaitlist(response.data);
      } catch (error) {
        setErrorFlag(true);
        setErrorMessage(error.toString());
      }
    };

    {/* th is the table header cell (name on the column) */}
    {/* td is table data cells (exact values to put into that columns)*/}

    const list_of_users = () => {
      return useIsRestoring.map((item) => {
        <tr key={item.user_id}>
          <th scope="row">{item.user_id}</th>
        </tr>
      })
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
                <tr scope='col'>position</tr>
                <tr scope='col'>Name</tr>
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
