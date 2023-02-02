import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import Input from './Input';
import './Movie.scss';
import axios from 'axios';
import Star from './Star';
import ReactStars from 'react-rating-stars-component';


function Movie() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true)
  const [review, setReview] = useState({
    star: 0,
    comment: ''
  })
  const [star, setStar] = useState(0)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/movie/${id}`);
        setData(response.data.data)
        setLoading(false)
        if (response.data.data.rating) {
          setStar(response.data.data.rating)
        }
        else {
          setStar(0.1)
        }

      }
      catch (error) {
        console.log('err')
      }
    }
    getData()
  }, [id]);

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
              {star ?
                <div className='star'>
                  <ReactStars edit={false}
                    size={30}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#00337c"
                    value={star} />
                </div> : null}
              <span className='desc'>{data.desc}</span>
              {data.year && <div className='line'></div>}
              {data.year && <>
                <Star edit={true} value={review.star} />
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