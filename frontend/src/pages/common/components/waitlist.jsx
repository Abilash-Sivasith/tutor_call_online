import React, { useState, useEffect } from 'react';

function WaitlistComponent({ roomId }) {
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [userLoading, setUserLoading] = useState(true); // Track user details loading

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        setLoading(true);
        // Fetch the waitlist based on roomId
        const response = await fetch(`/api/getInWaitlist?RoomId=${roomId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch waitlist');
        }

        const data = await response.json();
        setWaitlist(data.roomWaitlist);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching waitlist:', err);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchWaitlist();
    }
  }, [roomId]); // Re-fetch when roomId changes

  // Function to fetch user details for a given usercode
  const fetchUserDetails = async (usercode) => {
    try {
      const response = await fetch(`/api/getUserDetails?usercode=${usercode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [usercode]: data.user,
      }));
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  // Function to fetch user details for all users in the waitlist
  const fetchAllUserDetails = async () => {
    setUserLoading(true);
    // Fetch details for all users in the waitlist
    for (const user of waitlist) {
      await fetchUserDetails(user.UserId);
    }
    setUserLoading(false);
  };

  useEffect(() => {
    if (waitlist.length > 0) {
      // Fetch all user details once the waitlist is available
      fetchAllUserDetails();
    }
  }, [waitlist]); // Only run when the waitlist changes

  /** if (loading || userLoading) return <p>Loading waitlist...</p>;
  if (error) return <p>Error: {error}</p>;

  */

  return (
    <div className="waitlist-container text-center mt-5 mb-5">
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
              const user = userDetails[person.UserId];
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
