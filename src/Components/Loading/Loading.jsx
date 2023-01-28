import React from 'react'
import './Loading.scss'
import {BiLoaderAlt} from 'react-icons/bi'

function Loading({showLoading}) {
  return (
    <div className={`Loading ${showLoading ? 'ShowLoading' : ''}`}>
        {showLoading ? 
        <div>
            <BiLoaderAlt className='icon' />
            <span>Loading</span>
            </div> : null}
    </div>
  )
}

export default Loading