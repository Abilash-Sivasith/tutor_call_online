import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WaitlistComponent from "./common/components/waitlist.jsx";

import axios from "axios";



const InRoomPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { roomId, username } = location.state || {}; // Get the passed state from the previous page

    
       

}

export default InRoomPage;
