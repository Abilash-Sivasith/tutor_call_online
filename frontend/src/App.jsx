// const Page1 = () => <h1 className="text-2xl">This is Page 1</h1>;
// const Page2 = () => <h1 className="text-2xl">This is Page 2</h1>;

import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage"


function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />}/>
        </Routes>
    </div>

  );
}
 
export default App
