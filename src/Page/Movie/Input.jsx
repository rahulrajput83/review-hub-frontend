import React from 'react'

function Input({ placeholder, name, setReview, review }) {
  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value })
  }
  return (
    <input onChange={handleChange} name={name} type='text' placeholder={placeholder} />
  )
}

export default Input;