import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss'
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";
import Movie from "./Page/Movie/Movie";

function App() {
  const accessToken = useSelector((state) => state.accessToken);
  useEffect(() => {
    console.log(accessToken)
  }, [accessToken])
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/movie/:id' element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
