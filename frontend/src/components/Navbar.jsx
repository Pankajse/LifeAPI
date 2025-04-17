import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-evenly pt-2 w-full bg-white fixed bottom-0'>
        <Link to='/events'  className='text-center'> <i className="ri-calendar-event-line font-medium text-3xl"></i> <h4 className='font-medium'>Events</h4> </Link>
        <Link to='/chatbot' className='text-center'> <i className="ri-message-3-fill font-medium text-3xl"></i> <h4 className='font-medium'>Chatbot</h4> </Link>
        <Link to='/home' className=' bg-red-800  rounded-full  px-4 py-4 relative bottom-5 '> <i className="ri-home-8-line font-medium text-4xl text-white"></i> </Link>
        <Link to='/donate-blood' className='text-center'> <i className="ri-hand-heart-line font-medium text-3xl"></i> <h4 className='font-medium'>Donate</h4> </Link>
        <Link to='/profile' className='text-center'> <i className="ri-user-3-line font-medium text-3xl"></i> <h4 className='font-medium'>Profile</h4> </Link>
    </div>
  )
}

export default Navbar