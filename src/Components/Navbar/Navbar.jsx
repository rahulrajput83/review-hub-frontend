import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';


function Navbar() {
  return (
    <div className='Navbar'>
        <Link to='/' className='title'>
            <span>Review</span>
            <span>Hub</span>
        </Link>
        <Link className='login' to='/login'>Login</Link>
    </div>
  )
}

export default Navbar