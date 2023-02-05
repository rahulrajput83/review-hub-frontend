import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'

function Input({ placeholder, name, coverRead, setCoverRead, data, setData, value }) {
    const [show, setShow] = useState(false)

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSelect = (select) => {
        if(select === 'URL') {
            setCoverRead(false);
            setShow(false)
        }
    }
    

    return <div className='input'>
        {placeholder === 'Release Year' ?
        <input type="number" onChange={handleChange} value={value} name={name} min="1900" max="2099" step="1" />
        :
        placeholder === 'Image URL'
            ?
            <>
                <input readOnly={coverRead} type='text' onChange={handleChange} value={value} name={name} placeholder={placeholder} />
                {show ? <div className='cover'>
                    <span>Select from device</span>
                    <span onClick={() => handleSelect('URL')}>Enter URL</span>
                </div>: null}
                <FaAngleDown className='icon' onClick={() => setShow(!show)} />
            </>
            :
            <input type='text' onChange={handleChange} value={value} name={name} placeholder={placeholder} />}
    </div>
}

export default Input