import React, { useEffect, useState } from 'react'
import './AddMovie.scss'
import Input from './Input';

function AddMovie() {
    const [data, setData] = useState({
        cover: '',
        title: '',
        year: '2023',
        desc: '',
        rating: 0
    });
    const [coverRead, setCoverRead] = useState(true)
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <div className='AddMovie'>
            <span>Add New Movie</span>
            <form onSubmit={handleSubmit}>
                <Input value={data.cover} coverRead={coverRead} setCoverRead={setCoverRead} data={data} name='cover' setData={setData} placeholder={'Image URL'} />
                <Input value={data.title} data={data} name='title' setData={setData} placeholder={'Movie Title'} />
                <Input value={data.year} data={data} name='year' setData={setData} placeholder={'Release Year'} />
                <Input value={data.desc} data={data} name='desc' setData={setData} placeholder={'Movie Description'} />
                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}

export default AddMovie;