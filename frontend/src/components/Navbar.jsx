import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-evenly absolute pt-2 w-full'>
        <Link className='text-center'> <i className="ri-calendar-event-line font-medium text-3xl"></i> <h4 className='font-medium'>Events</h4> </Link>
        <Link className='text-center'> <i className="ri-drop-line font-medium text-3xl"></i> <h4 className='font-medium'>Donor</h4> </Link>
        <Link className=' bg-red-800  rounded-full  px-4 py-4 relative bottom-5 '> <i className="ri-home-8-line font-medium text-4xl text-white"></i> </Link>
        <Link className='text-center'> <i className="ri-hand-heart-line font-medium text-3xl"></i> <h4 className='font-medium'>Donate</h4> </Link>
        <Link className='text-center'> <i className="ri-user-3-line font-medium text-3xl"></i> <h4 className='font-medium'>Profile</h4> </Link>
    </div>
  )
}

export default Navbar