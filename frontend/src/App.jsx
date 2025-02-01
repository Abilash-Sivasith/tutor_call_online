import { useState } from 'react'
import {Route, Routes} from "react-router-dom"
import './App.css'
import HomePage from "./pages/HomePage"

const Page1 = () => <h1 className="text-2xl">This is Page 1</h1>;
const Page2 = () => <h1 className="text-2xl">This is Page 2</h1>;


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <p>Hello from apps.jsx</p>
  </>
  )
}
 
export default App
