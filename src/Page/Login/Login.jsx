import React from 'react'
import Input from './Input'
import './Login.scss'

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='Login'>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <Input type='text' placeholder='Email Address' />
                <Input type='password' placeholder='Email Password' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Login