import React, { useState, useEffect } from 'react';
import "../../common/css/waitlist.css";

function WaitlistComponent({ username, roomId }) {
  const [waitlist, setWaitlist] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        // Fetch the waitlist based on roomId
        const response = await fetch(`/api/getInWaitlist?RoomId=${roomId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch waitlist');
        }

        const data = await response.json();
        setWaitlist(data.roomWaitlist);
      } catch (err) {
        console.error('Error fetching waitlist:', err);
      }
    };

    if (roomId) {
      fetchWaitlist();
    }
  }, [roomId]); // Re-fetch when roomId changes

  // Function to fetch user details for a given UserId
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`/api/getUserDetails?username=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [userId]: data.user,
      }));
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  // Function to fetch user details for all users in the waitlist
  const fetchAllUserDetails = async () => {
    for (const person of waitlist) {
      await fetchUserDetails(person); // Fetch user details using UserId
    }
  };

  useEffect(() => {
    if (waitlist.length > 0) {
      fetchAllUserDetails(); // Fetch details for all users in the waitlist
    }
  }, [waitlist]); // Only run when the waitlist changes

  return (
    <div className="waitlist-container text-center">
      {waitlist.length === 0 ? (
        <p>No one is in the waitlist.</p>
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
                  <td>{user ? user.UserId : 'Loading...'}</td>
                  <td>{user ? user.Question : 'Loading...'}</td>
                  <td>{user ? user.PositionInList : 'Loading...'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WaitlistComponent;
