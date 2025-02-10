// const Page1 = () => <h1 className="text-2xl">This is Page 1</h1>;
// const Page2 = () => <h1 className="text-2xl">This is Page 2</h1>;

import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateRoomPage from "./pages/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import InRoomPage from "./pages/InRoomPage";
import FootNote from "./pages/common/footNote";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/CreateRoomPage" element={<CreateRoomPage />} />
          <Route path="/JoinRoomPage" element={<JoinRoomPage />} />
          <Route path="/InRoomPage" element={<InRoomPage />} />
        </Routes>
      </div>
      <FootNote />
      <Toaster/>
    </div>
  );
}

 
export default App
