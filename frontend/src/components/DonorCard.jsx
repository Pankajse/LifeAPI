import React from 'react'

const DonorCard = () => {
  return (
    <div className='flex gap-2 justify-around items-center bg-[#eeeeee] p-2 rounded-xl my-2'>
        <img className='rounded-full h-11 w-11' src="https://yt3.ggpht.com/a/AATXAJxPIvCmwTp3vwBzE9HSYF3CiM-Nl6Ed3cAMJg=s900-c-k-c0xffffffff-no-rj-mo" alt="profilePic" />
        <div>
            <h4 className='text-xl font-semibold'>Pankaj Singh</h4>
            <div className='flex items-center'><i className="ri-map-pin-2-line"></i> <p className='font-medium text-gray-700'>Addaguta,Hyderabad</p> </div>
            <div className='flex items-center'><i className="ri-phone-line"></i> <p className='font-medium text-gray-700'>6005302772</p> </div>
        </div>
        <div className=''>
            <h4 className='font-semibold text-2xl text-red-700 border-2 rounded-lg mb-2'>O+</h4>
            <i className="ri-message-2-line text-4xl text-gray-600"></i>
        </div>
    </div>
  )
}

export default DonorCard