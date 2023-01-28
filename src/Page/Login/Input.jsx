import React, { useState } from 'react'
import { BiUser, BiLockAlt, BiLockOpenAlt } from 'react-icons/bi'


function Input({ type, placeholder, setData, data, name }) {
  const [showPassword, setShowPassword] = useState(type);

  const handleShowPassword = () => {
    if(showPassword === 'password') {
      setShowPassword('text')
      setTimeout(() => {
        setShowPassword('password')
      }, 3000)
    }
    else {
      setShowPassword('password');
    }
  }

  /* Triggers input change */
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  return (
    <div className='input'>
      {type === 'email' ? <BiUser className='icon' /> : <BiLockAlt className='icon' />}
      <input name={name} onChange={(e) => handleChange(e)} type={showPassword} placeholder={placeholder} />
      {name === 'password' ? showPassword === 'password' ? <BiLockAlt onClick={handleShowPassword} className='icon password' /> : <BiLockOpenAlt onClick={handleShowPassword} className='icon password' /> : null}
    </div>
  )
}

export default Input