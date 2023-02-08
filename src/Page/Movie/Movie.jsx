import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import Input from './Input';
import './Movie.scss';
import axios from 'axios';
import Star from './Star';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteLS } from '../../Function.js/DeleteLS';
import { MdClose } from 'react-icons/md';


function Movie() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
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
  const [preview, setPreview] = useState([]);
  const [showErr, setShowErr] = useState(false);
  const [mess, setMess] = useState('');


  const calculate = useCallback(() => {
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


  const fetchData = useCallback(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/movie/${id}`, {
          headers: {
            "access-token": accessToken
          }
        });
        setData(response.data.data);
        setLoading(false);
        let reverse = response.data.data.rated.reverse();
        setPreview(reverse)
        const find = response.data.data.rated.find((e) => e.user._id === response.data.userId);
        if (find) {
          setShowReview(false)
        }
        setTotalStar(response.data.data.rating)
        calculate();
      }
      catch (error) {
        console.log('err')
      }
    }
    getData()
  }, [id, accessToken, calculate])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    calculate()
  }, [calculate])


  const handleSubmit = async () => {
    if (!review.star) {
      setShowErr(true)
      setMess('Please provide review star.')
    }
    else if (!review.comment) {
      setShowErr(true)
      setMess('Please provide review comment.')
    }
    else if (review.star && review.comment) {
      setShowErr(false)
      setMess('')
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
        if (response.data.message === 'Success') {
          fetchData();
          calculate();
        }

      }
      catch (err) {
        if (err.response.data.message === 'Unauthorized!' || err.response.data.message === 'No Token Provided!') {
          dispatch(DeleteLS());
          navigate('/login')
        }
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

              <span className={`error ${showErr ? 'showErr' : ''}`}>
                {showErr ? <>
                  {mess}
                  <MdClose onClick={() => setShowErr(false)} className='icon' />

                </> : ''}
              </span>

              {preview.length > 0 && preview.map((e, i) => {
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