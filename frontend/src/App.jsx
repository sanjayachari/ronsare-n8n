import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login/Login"

import Home  from "./pages/home/Home"
import "./App.css"
import Register from "./pages/register/Register"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
