import React from 'react'
import "./SingleCard.css"
const SingleCard = ({card}) => {
    return (
          <div className='card'>
            <div>
              <img src={card.src} className='front' alt="" />
              <img src="/img/cover.png" className='back' alt="" />
            </div>
          </div>
    )
}

export default SingleCard
