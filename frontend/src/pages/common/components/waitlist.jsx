  import React, { useState, useEffect } from 'react';
  import "../../common/css/waitlist.css";

  function WaitlistComponent({ username, roomId }) {

    return (
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
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
          </tbody>
      </table>
    </div>
    );
  }

  export default WaitlistComponent;
