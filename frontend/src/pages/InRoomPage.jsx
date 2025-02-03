import { useNavigate } from "react-router-dom";

const InRoomPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-4 py-10">
                <h1 className="text-2xl">Welcome to InRoomPage</h1>
            </div>
            <div className="flex gap-5">
                <button className="px-20 py-5 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={() => navigate("/")}>
                    Leave Room
                </button>
            </div>
        </div>

    )
};

export default InRoomPage;