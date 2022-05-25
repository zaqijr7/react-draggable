import React from 'react'
import './card.scss'
const Card = (props) => {
  return (
    <>
      <div className="card">
        <div className="card__image">
          <img src={props.item.img} alt="" srcset="" />
        </div>
        <div className="card__title"> 
          <p>{props.item.title}</p>
        </div>
      </div>
    </>
  )
}

export default Card