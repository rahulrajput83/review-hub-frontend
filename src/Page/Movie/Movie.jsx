import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import './Movie.scss'


function Movie() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/movie/${id}`).then(res => res.json());
        setData(response.data)
        setLoading(false)
      }
      catch (error) {
        console.log('err')
      }
    }
    getData()
  }, [id])
  return (
    <>
      <div className='Movie'>
        {data ?
          <>
            <div className='left'>
              <img src={data.cover} alt={data.title} />
            </div>
            <div className='right'>
              <div className='det'>
                <span className='title'>{data.title}</span>
                <span className='year'>{data.year && `(${data.year})`}</span>
              </div>
            </div>
          </> : null}
      </div>
      <Loading showLoading={loading} />
    </>
  )
}

export default Movie