import React from 'react'
import {FaHeart} from 'react-icons/fa6';
import {GrMapLocation} from "react-icons/gr"
import moment from 'moment/moment';


const TravelStoryCard = ({ imgUrl, title, story, date, location, isFavorite, onClick, onEdit, onFavoriteClick}) => {
  return (
    <div>
      <div className='border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer'>
        {/* Image */}
        <img 
        src={imgUrl}
        alt={title}
        className='w-full h-60 object-cover rounded-lg'
        onClick={onClick}
        />
        {/* Favorite button */}
        <button onClick={onFavoriteClick} className='w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border-white/30 absolute top-4 right-4'>
          <FaHeart className={`icon-btn ${isFavorite ? "text-red-500" : "text-white"}`}/>
        </button>
        {/* Title, date, story and location */}
        <div className='p-4' onClick={onClick}>
          <div className='flex items-center gap-3'>
            <div className='flex-1'>
              <h6 className='text-sm font-medium'>{title}</h6>
              <span className='text-xs text-slate-500'>
                {date? moment(date).format("Do MMM YYYY"):"-"}
              </span>
            </div>
          </div>
          <p className='text-xs text-slate-600 mt-2'>{story?.slice(0,60)}</p>
          <div className='inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1'>
            <GrMapLocation className='text-sm'/>
            {location.map((item, index)=> location.length==index +1 ? `${item}`: `${item},`)}
          </div>
        </div>
      </div>

     
    </div>
  )
}

export default TravelStoryCard