import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestBloodFormOrg = () => {
    const navigate = useNavigate();
    const [bloodType, setBloodType] = useState('');
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const bloodGroups = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/org/request-blood-form`,
                { bloodType, amount },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.status === 200) {
                setBloodType('');
                setAmount('');
                navigate('/nearby-donors-orgs-for-orgs'); // Redirect to blood requests page
            }
        } catch (error) {
            console.error("Submission error:", error);
            setError(error.response?.data?.message || 'Failed to submit request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 min-h-screen bg-white max-w-md mx-auto rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Request Blood</h1>
            
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={onSubmitHandler} className="space-y-6">
                {/* Blood Group Selection */}
                <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Blood Type</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {bloodGroups.map((group) => (
                            <button
                                key={group}
                                type="button"
                                onClick={() => setBloodType(group)}
                                className={`py-2 px-3 border-2 rounded-lg text-center transition-colors
                                    ${bloodType === group
                                        ? 'bg-red-800 text-white border-red-800'
                                        : 'border-red-800 text-red-900 hover:bg-red-100'}`}
                            >
                                {group}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Amount */}
                <div>
                    <label className="block text-lg font-medium text-gray-800 mb-2">
                        Amount (units)
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-800 focus:ring-1 focus:ring-red-800"
                        placeholder="Enter required units"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || !bloodType || !amount}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                        isSubmitting || !bloodType || !amount
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-red-800 hover:bg-red-900'
                    }`}
                >
                    {isSubmitting ? 'Submitting...' : 'Request Blood'}
                </button>
            </form>
        </div>
    );
};

export default RequestBloodFormOrg;