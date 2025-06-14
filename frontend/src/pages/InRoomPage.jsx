import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WaitlistComponent from "./common/components/waitlist.jsx";

import axios from "axios";



const InRoomPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { roomId, username } = location.state || {}; // Get the passed state from the previous page


    const RoomDescription = ({ currentRoomCode }) => {
        const [roomDescription, setRoomDescription] = useState('');
        const [error, setError] = useState(false);
        const [errorMessage, setErrorMessage] = useState("");

    }
}

export default InRoomPage;
