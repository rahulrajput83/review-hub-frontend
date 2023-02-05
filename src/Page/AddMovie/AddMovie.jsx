import React from 'react'
import './AddMovie.scss'
import Input from './Input';

function AddMovie() {
  return (
    <div className='AddMovie'>
        <span>Add New Movie</span>
        <Input placeholder={'Image URL'} />
        <Input placeholder={'Movie Title'} />
        <Input placeholder={'Release Year'} />
        <Input placeholder={'Movie Description'} />
    </div>
  )
}

export default AddMovie;