import axios from 'axios'
import React, { useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DeleteLS } from '../../Function.js/DeleteLS'

function Input({ placeholder, name, setShowErr, setMess, data, setData, value, setUploadingImage }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.accessToken)
    const [show, setShow] = useState(false)

    const handleChange = (e) => {
        setShowErr(false);
        setMess('');
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const inputref = useRef(null)

    const handleInputCLick = () => {
        inputref.current.click();
    }

    const handleImage = (e) => {
        let file = e.target.files[0];
        setFileToBase(file);
        e.target.value = ''
    }

    const setFileToBase = (file) => {
        if (!file) {
            alert('Please select an image');
        }
        else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setShow(false);
                setShowErr(true)
                setMess('Please wait, uploading image.');
                setUploadingImage(true)
                axios.post(`${process.env.REACT_APP_BACKEND}/image`,
                    {
                        image: reader.result
                    },
                    {
                        headers: {
                            "access-token": accessToken
                        }
                    })
                    .then((response) => {
                        setShowErr(true)
                        setMess('Successfully Uploaded.');
                        setUploadingImage(false)
                        setData({ ...data, cover: response.data.url })
                    })
                    .catch((err) => {
                        if (err.response.data.message === 'Unauthorized!' || err.response.data.message === 'No Token Provided!') {
                            DeleteLS();
                            let action = {
                                type: 'Logout'
                            }
                            dispatch(action);
                            navigate('/login')
                          }
                        setShowErr(true)
                        setMess('Failed, please try again.');
                        setUploadingImage(false)
                    })
            }
        }
    }


    return <div className='input'>
        {placeholder === 'Release Year' ?
            <input type="number" onChange={handleChange} value={value} name={name} min="1900" max="2025" step="1" />
            :
            placeholder === 'Image URL'
                ?
                <>
                    <input type='url' onChange={handleChange} value={value} name={name} placeholder={placeholder} />
                    {show ? <div onClick={handleInputCLick} className='cover'>
                        <span>Select from device</span>
                    </div> : null}
                    <FaAngleDown className='icon' onClick={() => setShow(!show)} />
                    <input type='file' accept='image/*' ref={inputref} onChange={handleImage} className='file' />
                </>
                :
                <input type='text' onChange={handleChange} value={value} name={name} placeholder={placeholder} />}
    </div>
}

export default Input