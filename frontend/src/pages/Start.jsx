import React from 'react'
import { Link } from 'react-router-dom'
import womenTransferHeartLogo from '../assets/icons/women-transfer-heart.webp'

const Start = () => {
  return (
    <div className='flex flex-col items-center'>
        <img className='mt-32' src={womenTransferHeartLogo} alt="image" />
        <div className='mt-12 mb-28 flex flex-col items-center'>
        <h3 className='text-2xl font-semibold'>Request Blood </h3>
        <h3 className='text-2xl font-semibold '>Specify your needs</h3>
        </div>
        <Link to='/login-options' className='bg-red-800 w-60 text-white font-normal text-lg text-center py-2 px-2 rounded-xl'>Get Started</Link>
    </div>
  )
}

export default Start