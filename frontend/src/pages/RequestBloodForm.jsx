import React from 'react'
import { useNavigate } from 'react-router-dom';

const RequestBloodForm = () => {
    const navigate = useNavigate();
    return (
        <div className='p-4 h-screen'>

            <div className='flex justify-between py-1'>
                <div className='flex items-center'>
                <button onClick={()=>{navigate('/home')}}><i className="ri-arrow-left-s-line text-3xl font-medium "></i></button>
                    <h4 className='text-xl font-medium'>Request Blood</h4>
                </div>
                <div className='flex items-center gap-1'>
                <img className='rounded-full h-9 w-9' src="https://yt3.ggpht.com/a/AATXAJxPIvCmwTp3vwBzE9HSYF3CiM-Nl6Ed3cAMJg=s900-c-k-c0xffffffff-no-rj-mo" alt="profilePic" />
                <i className="ri-notification-2-line text-3xl text-gray-800 "></i>
                </div>
            </div>

            <div className='py-2'>
                <h5 className='text-lg font-medium py-3 text-gray-800'>Choose the blood group</h5>
                <div className='grid grid-cols-4 gap-7 '>
                    <div className='text-lg font-medium px-3 py-2 border-2 border-red-800 text-red-900 rounded-lg text-center' >A+</div>
                    <div className='text-lg font-medium px-3 py-2 border-2 border-red-800 text-red-900 rounded-lg text-center' >B+</div>
                    <div className='text-lg font-medium px-3 py-2 border-2 border-red-800 text-red-900 rounded-lg text-center' >AB+</div>
                    <div className='text-lg font-medium px-3 py-2 border-2 border-red-800 text-red-900 rounded-lg text-center' >O+</div>
                    <div className='text-lg font-medium px-3 py-2 border-2 border-red-800 text-red-900 rounded-lg text-center' >A-</div>
                    <div className='text-lg font-medium px-3 py-2 border-2 border-red-800 text-red-900 rounded-lg text-center' >B-</div>
                    <div className='text-lg font-medium px-3 py-2 border-2 border-red-800 text-red-900 rounded-lg text-center' >AB-</div>
                    <div className='text-lg font-medium px-3 py-2 border-2 border-red-800 text-red-900 rounded-lg text-center' >O-</div>
                </div>
            </div>

            <form action="">
                <h5 className='font-medium py-1 text-gray-700'>Choose your amount</h5>
                <input type="number" placeholder='Quantity' className='w-full rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />
                <h5 className='font-medium py-1 text-gray-700'>Choose your Location</h5>
                <input type="number" placeholder='Select Location' className='w-full rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />
                <h5 className='font-medium py-1 text-gray-700'>Contact Information</h5>
                <input type="number" placeholder='Mobile/Telephone' className='w-full rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />
                <h5 className='font-medium py-1 text-gray-700'>Patient Information</h5>
                <input type="number" placeholder='Disease/Cause' className='w-full rounded-lg my-2 py-1.5 px-2 text-base outline-2 outline-gray-500 font-medium ' />

                <button className='bg-red-800 text-white font-medium w-full py-2 px-1 rounded-lg mt-7'>Request Now</button>
                <button className='text-red-800 border-2 border-red-800 font-medium w-full py-2 px-1 rounded-lg mt-7'>Save for later</button>
            </form>
        </div>
    )
}

export default RequestBloodForm