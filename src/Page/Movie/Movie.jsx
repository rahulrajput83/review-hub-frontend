import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import Input from './Input';
import './Movie.scss';
import axios from 'axios'


function Movie() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true)
  const [review, setReview] = useState({
    star: 0,
    comment: ''
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/movie/${id}`);
        setData(response.data.data)
        setLoading(false)
        
      }
      catch (error) {
        console.log('err')
      }
    }
    getData()
  }, [id]);

  useEffect(() => {
    console.log(review)
  }, [review])
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
              <span className='desc'>{data.desc}</span>
              {data.year && <div className='line'></div>}
              {data.year && <>
                <Input name='comment' review={review} setReview={setReview} placeholder='Share your review' />
                <button>Publish</button>
              </>}
            </div>
          </> : null}
      </div>
      <Loading showLoading={loading} />
    </>
  )
}

export default Movie