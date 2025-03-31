import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LocationSearchPanel from './LocationSearchPanel';

const DonateBloodForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bloodType: '',
        healthStatus: 'Good',
        availabilityDate: '',
        city: '',
        weight: '',
        age: '',
        homeAddress: '',
        contactNumber: '', // Added contact number field
        consent: false
    });
    const [showLocationPanel, setShowLocationPanel] = useState(false);

    const bloodGroups = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.consent) {
            alert('Please agree to the consent terms');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login first');
                return;
            }

            const payload = {
                bloodType: formData.bloodType,
                healthStatus: formData.healthStatus,
                availability: {
                    date: formData.availabilityDate,
                    city: formData.city
                },
                homeAddress: formData.homeAddress,
                contactNumber: formData.contactNumber, // Include contact number in payload
                weight: parseInt(formData.weight),
                age: parseInt(formData.age)
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/bloodServices/donate-blood-form`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                navigate('/donate-blood-sub');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Error submitting donation form');
        }
    };

    return (
        <div className="p-6 min-h-screen bg-white max-w-4xl mx-auto rounded-lg shadow-md">
            {/* Blood Group Selection */}
            <div className="py-4">
                <h5 className="text-lg font-medium text-gray-800 mb-4">Choose your blood group</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {bloodGroups.map((group) => (
                        <div
                            key={group}
                            onClick={() => setFormData({...formData, bloodType: group})}
                            className={`text-lg font-medium px-4 py-3 border-2 rounded-lg text-center cursor-pointer transition-colors
                                ${formData.bloodType === group
                                    ? 'bg-red-800 text-white border-red-800'
                                    : 'border-red-800 text-red-900 hover:bg-red-800 hover:text-white'}`}
                        >
                            {group}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
                {/* Home Address */}
                <div className="mb-6 relative">
                    <h5 className="font-medium text-gray-700 mb-2">Home Address</h5>
                    <input
                        type="text"
                        name="Address"
                        placeholder="Enter your address"
                        value={formData.homeAddress}
                        onChange={(e) => {
                            setFormData({...formData, homeAddress: e.target.value});
                            setShowLocationPanel(e.target.value.length >= 3);
                        }}
                        required
                        className="w-full rounded-lg py-2 px-4 text-base outline-none border border-gray-300 focus:border-red-800 transition-colors"
                    />
                    {showLocationPanel && (
                        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            <LocationSearchPanel
                                address={formData.homeAddress}
                                setAddress={(address) => {
                                    setFormData({...formData, homeAddress: address});
                                    setShowLocationPanel(false);
                                }}
                                onSelect={() => setShowLocationPanel(false)}
                            />
                        </div>
                    )}
                </div>

                {/* Health Status */}
                <div className="mb-6">
                    <h5 className="font-medium text-gray-700 mb-2">Health Status</h5>
                    <input
                        type="text"
                        name="healthStatus"
                        placeholder="Recent surgery, allergy, vaccine or taking medicine"
                        value={formData.healthStatus}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg py-2 px-4 text-base outline-none border border-gray-300 focus:border-red-800 transition-colors"
                    />
                </div>

                {/* Availability */}
                <div className="mb-6">
                    <h5 className="font-medium text-gray-700 mb-2">Availability till date and city</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="date"
                            name="availabilityDate"
                            placeholder="Date till available"
                            className="w-full rounded-lg py-2 px-4 text-base outline-none border border-gray-300 focus:border-red-800 transition-colors"
                            value={formData.availabilityDate}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className="w-full rounded-lg py-2 px-4 text-base outline-none border border-gray-300 focus:border-red-800 transition-colors"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Weight and Age */}
                <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h5 className="font-medium text-gray-700 mb-2">Weight (kg)</h5>
                            <input
                                type="number"
                                name="weight"
                                placeholder="Enter your weight"
                                className="w-full rounded-lg py-2 px-4 text-base outline-none border border-gray-300 focus:border-red-800 transition-colors"
                                value={formData.weight}
                                onChange={handleChange}
                                min="40"
                                required
                            />
                        </div>
                        <div>
                            <h5 className="font-medium text-gray-700 mb-2">Age</h5>
                            <input
                                type="number"
                                name="age"
                                placeholder="Enter your age"
                                className="w-full rounded-lg py-2 px-4 text-base outline-none border border-gray-300 focus:border-red-800 transition-colors"
                                value={formData.age}
                                onChange={handleChange}
                                min="18"
                                max="65"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Number */}
                <div className="mb-6">
                    <h5 className="font-medium text-gray-700 mb-2">Contact Number</h5>
                    <input
                        type="tel"
                        name="contactNumber"
                        placeholder="Enter your contact number"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg py-2 px-4 text-base outline-none border border-gray-300 focus:border-red-800 transition-colors"
                    />
                </div>

                {/* Consent */}
                <div className="mb-6">
                    <h5 className="font-medium text-gray-700 mb-2">Consent</h5>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="consent"
                            className="w-5 h-5"
                            checked={formData.consent}
                            onChange={handleChange}
                            required
                        />
                        <p className="text-sm font-normal text-gray-600">
                            I voluntarily consent to donate blood and agree to any necessary checks before donation.
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-red-800 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-900 transition-colors"
                    disabled={!formData.consent}
                >
                    Proceed to Donate
                </button>
            </form>
        </div>
    );
};

export default DonateBloodForm;