import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss'
import Navbar from "./Components/Navbar/Navbar";
import AddMovie from "./Page/AddMovie/AddMovie";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";
import Movie from "./Page/Movie/Movie";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/movie/:id' element={<Movie />} />
        <Route path='/add-movie' element={<AddMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
