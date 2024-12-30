import React from 'react'

const EmptyCard = ({message}) => {
  return (
    <div className='w-full h-screen flex justify-center items-center text-lg italic'>{message}</div>
  )
}

export default EmptyCard