import React, { useEffect, useState } from 'react'
import './Home.scss'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import { BsStarFill } from 'react-icons/bs'
import Loading from '../../Components/Loading/Loading'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/all-movies`);
        setData(response.data.data)
        setLoading(false)
      }
      catch (error) {
        console.log('err')
      }
    }
    getData()
  }, [])

  return (
    <>
      <div className='Home'>
        {data.length > 0 && data.map((e, i) => {
          return (
            <Link to={`/movie/${e._id}`} className='item' key={`data${i}`}>
              <div className='img'>
                <img src={e.cover} alt='' />
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
            </Link>
          )
        })}
      </div>
      <Loading showLoading={loading} />
    </>
  )
}

export default Home