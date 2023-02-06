import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.scss'
import Navbar from "./Components/Navbar/Navbar";
import AddMovie from "./Page/AddMovie/AddMovie";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";
import Movie from "./Page/Movie/Movie";
import { useSelector } from 'react-redux'

const Private = ({ accessToken, children }) => {
  if (!accessToken) {
    return <Navigate to='/login' replace />
  }
  return children;
}

function App() {
  const accessToken = useSelector((state) => state.accessToken)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/movie/:id' element={<Movie />} />
        <Route path='/add-movie' element={<Private accessToken={accessToken}><AddMovie /></Private>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
