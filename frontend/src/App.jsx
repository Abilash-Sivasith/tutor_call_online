// const Page1 = () => <h1 className="text-2xl">This is Page 1</h1>;
// const Page2 = () => <h1 className="text-2xl">This is Page 2</h1>;

import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateRoomPage from "./pages/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import InRoomPage from "./pages/InRoomPage";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center">
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/CreateRoomPage" element={<CreateRoomPage/>}/>
          <Route path="/JoinRoomPage" element={<JoinRoomPage/>}/>
          <Route path="/InRoomPage" element={<InRoomPage/>}/>
        </Routes>
    </div>

  );
} 
 
export default App
