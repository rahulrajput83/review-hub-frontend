import React, { useState } from 'react'
import Input from './Input'
import './Login.scss'
import { MdClose } from 'react-icons/md'
import { BiUser, BiLock } from 'react-icons/bi'
import Loading from '../../Components/Loading/Loading'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    
    const [showErr, setShowErr] = useState(false);
    const [mess, setMess] = useState('');
    const [showLoading, setShowLoading] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!data.email) {
            setShowErr(true)
            setMess('Please Enter Email Address.')
        }
        else if(!data.password) {
            setShowErr(true)
            setMess('Please Enter Password.')
        }
        else if (data.password.length < 6) {
            setShowErr(true)
            setMess('Password must be at least 6 characters.')
        }
        else if (data.email && data.password) {
            setBtnDisabled(true)
            setShowLoading(true);
            setShowErr(false);
            setMess('')
            axios.post(`${process.env.REACT_APP_BACKEND}/login`, {
                email: data.email,
                password: data.password
            })
                .then((res) => {
                    if (res.data.message === 'success') {
                        setShowLoading(false)
                        setBtnDisabled(false)
                        localStorage.setItem('accessToken', res.data.accessToken)
                        navigate('/')
                    }
                })
                .catch((err) => {
                    setShowLoading(false)
                    setBtnDisabled(false)
                    if (err.response) {
                        if (err.response.data.message === 'Wrong Password') {
                            setShowErr(true);
                            setMess('Wrong Password')
                        }
                    }
                    else {
                        setShowErr(true);
                        setMess('Please try again...')
                    }

                })
        }
        
    }

    return (
        <>
            <div className='Login'>
                <span className='title'>Login / Register</span>
                <form onSubmit={handleSubmit}>
                    <Input setData={setData} iconF={BiUser} data={data} name='email' type='email' placeholder='Email Address' />
                    <Input setData={setData} iconF={BiLock} data={data} name='password' type='password' placeholder='Enter Password' />
                    <button disabled={btnDisabled} type='submit'>Submit</button>
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