import React from 'react'
import './Loading.scss'
import { ThreeCircles } from 'react-loader-spinner'

function Loading({ showLoading }) {
  return showLoading ? <div className={`Loading`}>
    <ThreeCircles
      color="#00337c"
      width='50'
      height='50'
      visible={showLoading}
    />
  </div> : null
}

export default Loading