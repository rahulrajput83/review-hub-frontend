import React from 'react'

function Input({placeholder, name, value}) {
  return (
    <input type='text' name={name} value={value} placeholder={placeholder} />
  )
}

export default Input