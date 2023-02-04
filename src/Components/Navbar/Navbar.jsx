import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navbar.scss';


function Navbar() {
  const accessToken = useSelector((state) => state.accessToken);

  return (
    <div className='Navbar'>
        <Link to='/' className='title'>
            <span>Review</span>
            <span>Hub</span>
        </Link>
        {!accessToken ? <Link className='login' to='/login'>Login</Link> : null /* <Link className='login' to='/add-movie'>Add Movie</Link>  */}
    </div>
  )
}

export default Navbar;