import React, { useState } from 'react'
import Input from './Input'
import './Login.scss'
import { MdClose } from 'react-icons/md'
import {BiUser, BiLock} from 'react-icons/bi'
import Loading from '../../Components/Loading/Loading'

function Login() {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [showErr, setShowErr] = useState(false);
    const [mess, setMess] = useState('');
    const [showLoading, setShowLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.email && data.password) {
            console.log(data)
            setShowLoading(!showLoading)
        }
        else {
            setShowErr(true)
            setMess('Please fill all required detail.')
        }
    }

    return (
        <>
        <div className='Login'>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <Input setData={setData} iconF={BiUser} data={data} name='email' type='email' placeholder='Email Address' />
                <Input setData={setData} iconF={BiLock} data={data} name='password' type='password' placeholder='Enter Password' />
                <button type='submit'>Submit</button>
            </form>
            <span className={`error ${showErr ? 'showErr' : ''}`}>
                {showErr ? <>
                    {mess}
                    <MdClose onClick={() => setShowErr(false)} className='icon' />
                
                </> : ''}
            </span>
        </div>
        <Loading showLoading={showLoading} />
        </>
    )
}

export default Login