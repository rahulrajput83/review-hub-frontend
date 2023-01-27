import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss'
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
