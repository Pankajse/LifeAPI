import React from 'react'
import DonorCard from '../components/DonorCard'

const Donors = () => {
    return (
        <div className='p-4'>
            <div className='flex justify-between py-4'>
                <div className='flex items-center'>
                    <i className="ri-arrow-left-s-line text-3xl font-medium "></i>
                    <h4 className='text-xl font-medium'>Donors</h4>
                </div>
                <div className='flex items-center gap-1'>
                    <i className="ri-notification-2-line text-3xl text-gray-800 "></i>
                    <i className="ri-more-2-fill text-3xl font-medium "></i>
                </div>
            </div>
            <DonorCard/>
            <DonorCard/>
            <DonorCard/>
            <DonorCard/>
        </div>
    )
}

export default Donors