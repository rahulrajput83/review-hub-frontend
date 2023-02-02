import React from 'react'
import ReactStars from 'react-rating-stars-component'

function Star({ setReview, review, value, edit }) {

  const ratingChanged = (newRating) => {
    setReview({ ...review, star: newRating })
  };

  return (
    <div className='star'>
      <ReactStars
        value={value}
        count={5}
        edit={edit}
        onChange={edit ? ratingChanged : null}
        size={30}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#00337c"
      />
    </div>
  )
}

export default Star