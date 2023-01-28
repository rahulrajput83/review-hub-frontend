import React from 'react'
import { data } from './fake'
import './Home.scss'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import { BsStarFill } from 'react-icons/bs'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

function Home() {
  return (
    <div className='Home'>
      {data.map((e, i) => {
        return (
          <div className='item' key={`data${i}`}>
            <div className='img'>
              <img src={e.img} alt='' />
            </div>

            <div className='data'>
              <div className='top'>
                <span className='title'>{e.title}</span>
                <div className='rating'>
                  <span>4.5</span>
                  <BsStarFill />
                </div>
              </div>
              <span className='desc'>
                <ResponsiveEllipsis text={e.desc}
                maxLine='3'
                ellipsis=' ..'
                trimRight
                basedOn='letters'
              />
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home