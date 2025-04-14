
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestBloodFormOrg from '../components/RequestBloodformOrg';

const RequestBloodOrg = () => {
    const navigate = useNavigate();

    return (
        <div>
            < div className="flex justify-between items-center py-2" >
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate('/home-org')}>
                        <i className="ri-arrow-left-s-line text-3xl font-medium text-gray-800"></i>
                    </button>
                    <h4 className="text-xl font-medium text-gray-800">Request Blood</h4>
                </div>
                <div className="flex items-center gap-3">
                    <img
                        className="rounded-full h-9 w-9 object-cover"
                        src="https://yt3.ggpht.com/a/AATXAJxPIvCmwTp3vwBzE9HSYF3CiM-Nl6Ed3cAMJg=s900-c-k-c0xffffffff-no-rj-mo"
                        alt="profilePic"
                    />
                    <i className="ri-notification-2-line text-2xl text-gray-800"></i>
                </div>
            </div >
            <RequestBloodFormOrg/>
        </div>
    );
};

export default RequestBloodOrg;