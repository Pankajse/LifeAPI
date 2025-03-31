import React, { useState } from 'react';
import LocationSearchPanel from './LocationSearchPanel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestBloodForm = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [showLocationPanel, setShowLocationPanel] = useState(false);
    const [bloodType, setBloodType] = useState('');
    const [amount, setAmount] = useState('');
    const [contact, setContact] = useState('');
    const [cause, setCause] = useState('');
    const [status, setStatus] = useState(false);

    const bloodGroups = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/bloodServices/request-blood-form`, {
                bloodType,
                amount,
                address,
                contact,
                cause,
                status
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.status === 200) {
                setAddress('');
                setBloodType('');
                setContact('');
                setCause('');
                setAmount('');
                status ? navigate('/nearby-donors-orgs') : navigate('/request-blood-later');
            }
        } catch (error) {
            console.error("Submission error:", error);
            // Add error handling UI here if needed
        }
    };

    return (
        <div className="p-6 min-h-screen bg-white max-w-4xl mx-auto rounded-lg shadow-md">
            {/* Blood Group Selection */}
            <div className="py-4">
                <h5 className="text-lg font-medium text-gray-800 mb-4">Choose the blood group</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {bloodGroups.map((group) => (
                        <div
                            key={group}
                            onClick={() => setBloodType(group)}
                            className={`text-lg font-medium px-4 py-3 border-2 rounded-lg text-center cursor-pointer transition-colors
                                ${bloodType === group
                                    ? 'bg-red-800 text-white border-red-800'
                                    : 'border-red-800 text-red-900 hover:bg-red-800 hover:text-white'}`}
                        >
                            {group}
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Section */}
            <form onSubmit={onSubmitHandler} className="mt-6">
                {/* Quantity */}
                <div className="mb-6">
                    <h5 className="font-medium text-gray-700 mb-2">Choose your amount (in units)</h5>
                    <input
                        type="number"
                        min="1"
                        placeholder="Quantity"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full rounded-lg py-2 px-4 text-base outline-none border border-gray-300 focus:border-red-800 transition-colors"
                    />
                </div>

                {/* Location */}
                <div className="mb-6 relative">
                    <h5 className="font-medium text-gray-700 mb-2">Choose your Location</h5>
                    <input
                        type="text"
                        placeholder="Select Location"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            setShowLocationPanel(e.target.value.length >= 3);
                        }}
                        required
                        className="w-full rounded-lg py-2 px-4 text-base outline-none border border-gray-300 focus:border-red-800 transition-colors"
                    />
                    {showLocationPanel && (
                        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            <LocationSearchPanel
                                address={address}
                                setAddress={setAddress}
                                onSelect={() => setShowLocationPanel(false)}
                            />
                        </div>
                    )}
                </div>

                {/* Contact Information */}
                <div className="mb-6">
                    <h5 className="font-medium text-gray-700 mb-2">Contact Information</h5>
                    <input
                        type="tel"
                        placeholder="Mobile/Telephone"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                        className="w-full rounded-lg py-2 px-4 text-base outline-none border border-gray-300 focus:border-red-800 transition-colors"
                    />
                </div>

                {/* Patient Information */}
                <div className="mb-6">
                    <h5 className="font-medium text-gray-700 mb-2">Patient Information</h5>
                    <input
                        type="text"
                        placeholder="Disease/Cause"
                        value={cause}
                        onChange={(e) => setCause(e.target.value)}
                        required
                        className="w-full rounded-lg py-2 px-4 text-base outline-none border border-gray-300 focus:border-red-800 transition-colors"
                    />
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        type="submit"
                        onClick={() => setStatus(true)}
                        className="bg-red-800 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-900 transition-colors"
                    >
                        Request Now
                    </button>
                    <button
                        type="submit"
                        onClick={() => setStatus(false)}
                        className="text-red-800 border-2 border-red-800 font-medium py-3 px-4 rounded-lg hover:bg-red-800 hover:text-white transition-colors"
                    >
                        Save for later
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RequestBloodForm;