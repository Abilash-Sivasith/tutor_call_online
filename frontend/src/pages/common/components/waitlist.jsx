  import React, { useState } from 'react';
  import "../../common/css/waitlist.css";
import { useMutation } from '@tanstack/react-query';

  function WaitlistComponent({ username, roomId }) {

    const [waitlist, setWaitlist] = useState({waitlist: []})

    const { mutate: waitlistMutation, isError, isPending, error } = useMutation({
      mutationFn: async ({ roomId }) => {
        const res = await fetch(`/api/getInWaitlist?RoomId=${roomId}`, {
          method: "GET"
        });
    
        const data = await res.json();
    
        if (!res.ok) {
          throw new Error("Something went wrong fetching waitlist");
        }
        return data;
      }
    });

    const handleSubmit = (event) => {
      event.preventDefault();
      waitlistMutation({ roomId }, {
        onSuccess: (data) => {
          console.log("Waitlist data:", data.roomWaitlist);
          setWaitlist({ waitlist: data.roomWaitlist });
        }
      });    };

    const handleInputChange = (event) => {
      setWaitlist({waitlist: event.target.value})
    }

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
