import axios from 'axios';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteLS } from '../../Function.js/DeleteLS';
import './AddMovie.scss'
import Input from './Input';

function AddMovie() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.accessToken)
    const [showErr, setShowErr] = useState(false);
    const [mess, setMess] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false)
    const [data, setData] = useState({
        cover: '',
        title: '',
        year: '2023',
        desc: '',
        rating: 0
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uploadingImage) {
            setShowErr(true)
            setMess('Please wait, uploading image.')
        }
        else if (!data.cover) {
            setShowErr(true)
            setMess('Please upload image or enter image url.')
        }
        else if (!data.title) {
            setShowErr(true)
            setMess('Please enter title.')
        }
        else if (!data.desc) {
            setShowErr(true)
            setMess('Please enter description.')
        }
        else if (!data.year) {
            setShowErr(true)
            setMess('Please enter release date.')
        }
        else if (!uploadingImage && data.cover && data.title && data.year && data.desc) {
            setShowErr(true)
            setMess('Adding, please wait.')
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND}/upload`,
                    {
                        cover: data.cover,
                        title: data.title,
                        year: data.year,
                        desc: data.desc,
                        rating: data.rating
                    },
                    {
                        headers: {
                            "access-token": accessToken
                        }
                    });
                if (response.data.message === 'Successfully Added...') {
                    setShowErr(true)
                    setMess('Successfully Added')
                    setData({
                        cover: '',
                        title: '',
                        year: '2023',
                        desc: '',
                        rating: 0
                    })
                }

            }
            catch (err) {
                if (err.response.data.message === 'Unauthorized!' || err.response.data.message === 'No Token Provided!') {
                    dispatch(DeleteLS());
                    navigate('/login')
                }
                setShowErr(true)
                setMess('Failed, please try again.')
            }
        }
    }


    return (
        <div className='AddMovie'>
            <span>Add New Movie</span>
            <form onSubmit={handleSubmit}>
                <Input setShowErr={setShowErr} setUploadingImage={setUploadingImage} setMess={setMess} value={data.cover} data={data} name='cover' setData={setData} placeholder={'Image URL'} />
                <Input setShowErr={setShowErr} setMess={setMess} value={data.title} data={data} name='title' setData={setData} placeholder={'Movie Title'} />
                <Input setShowErr={setShowErr} setMess={setMess} value={data.year} data={data} name='year' setData={setData} placeholder={'Release Year'} />
                <Input setShowErr={setShowErr} setMess={setMess} value={data.desc} data={data} name='desc' setData={setData} placeholder={'Movie Description'} />
                <button type='submit'>Upload</button>
                <span className={`error ${showErr ? 'showErr' : ''}`}>
                    {showErr ? <>
                        {mess}
                        <MdClose onClick={() => setShowErr(false)} className='icon' />

                    </> : ''}
                </span>
            </form>
        </div>
    )
}

export default AddMovie;