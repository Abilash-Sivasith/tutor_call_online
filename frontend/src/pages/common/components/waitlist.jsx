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
    
        // const data = await response.json();
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

    /** 
    if (errorFlag) {
      return (
        <div>
          <div style={{color = "red"}}>{errorMessage}</div>
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
    }
    */




    return (
      <div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Question</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>4</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>5</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>6</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>7</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>8</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>9</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>10</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>11</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>12</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>13</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>14</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>15</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
            <tr>
              <th>16</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
            </tr>
          </tbody>
      </table>
    </div>
    );
  }

  export default WaitlistComponent;
