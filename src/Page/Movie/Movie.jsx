import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import Input from './Input';
import './Movie.scss';
import axios from 'axios';
import Star from './Star';
import ReactStars from 'react-rating-stars-component';
import { useSelector } from 'react-redux';


function Movie() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true)
  const [review, setReview] = useState({
    star: 0,
    comment: ''
  })
  const [star, setStar] = useState(0);
  const accessToken = useSelector((state) => state.accessToken)
  const [showReview, setShowReview] = useState(true);
  const [totalStar, setTotalStar] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/movie/${id}`, {
          headers: {
            "access-token": accessToken
          }
        });
        setData(response.data.data)
        setLoading(false)
        const find = response.data.data.rated.find((e) => e.user._id === response.data.userId);
        if (find) {
          setShowReview(false)
        }
        setTotalStar(response.data.data.rating)

      }
      catch (error) {
        console.log('err')
      }
    }
    getData()
  }, [id, accessToken]);

  useEffect(() => {
    if (data.year) {
      let calculateStar = totalStar / data.rated.length;
      if (calculateStar) {

        setStar(calculateStar)
      }
      else {
        setStar(0.1)
      }
    }
  }, [totalStar, data])


  const handleSubmit = async () => {
    if (review.star && review.comment) {
      try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND}/rate`,
          {
            rated: review,
            movieId: id,
            rating: totalStar + review.star
          },
          {
            headers: {
              "access-token": accessToken
            }
          });
        console.log(response.data)

      }
      catch (error) {
        console.log(error)
      }
    }
  }

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
              {showReview && data.year && <>
                <Star edit={true} value={review.star} review={review} setReview={setReview} />
                <Input name='comment' review={review} setReview={setReview} placeholder='Share your review' />
                <button onClick={handleSubmit}>Publish</button>
              </>}
              {data.year && data.rated.length > 0 && data.rated.reverse().map((e, i) => {
                return (
                  <div className='Preview' key={e.user._id}>
                    <ReactStars edit={false}
                    size={18}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#00337c"
                    value={e.rating.star} />
                    
                    <span>{e.rating.comment}</span>
                    <span>{e.user.userName}</span>
                  </div>
                )
              })}
            </div>
          </> : null}
      </div>
      <Loading showLoading={loading} />
    </>
  )
}

export default Movie