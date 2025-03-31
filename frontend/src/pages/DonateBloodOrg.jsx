import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrgDataContext } from '../context/OrgContext';
import axios from 'axios';

const DonateBloodOrg = () => {
  const navigate = useNavigate();
  const { org } = useContext(OrgDataContext);
  const [bloodGroups, setBloodGroups] = useState({
    'A+': 0,
    'A-': 0,
    'B+': 0,
    'B-': 0,
    'AB+': 0,
    'AB-': 0,
    'O+': 0,
    'O-': 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStock, setCurrentStock] = useState({});
  const [donationStock, setDonationStock] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current blood stock
        const stockResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/org/blood-stock`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setCurrentStock(stockResponse.data.bloodStock);

        // Fetch existing donation data if any
        const donationResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/org/donate-blood`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        if (donationResponse.data.donation) {
          setDonationStock(donationResponse.data.donation.bloodGroups);
          setBloodGroups(donationResponse.data.donation.bloodGroups);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBloodUnitChange = (bloodType, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    const availableStock = currentStock[bloodType] || 0;
    
    // Validate that donation doesn't exceed available stock
    if (newValue > availableStock) {
      setErrors(prev => ({
        ...prev,
        [bloodType]: `Cannot donate more than ${availableStock} units`
      }));
      return;
    } else {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[bloodType];
        return newErrors;
      });
    }

    setBloodGroups(prev => ({
      ...prev,
      [bloodType]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/org/donate-blood`,
        { bloodGroups },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 200) {
        alert('Donation submitted successfully!');
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert(error.response?.data?.msg || 'Failed to submit donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalUnits = Object.values(bloodGroups).reduce((sum, units) => sum + units, 0);
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <button onClick={()=>{navigate('/home-org')}}><i className="ri-arrow-left-s-line text-2xl font-medium"></i></button>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Donate Blood</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Blood Group Donations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(bloodGroups).map(([bloodType, units]) => {
                const available = currentStock[bloodType] || 0;
                const previouslyDonated = donationStock[bloodType] || 0;
                
                return (
                  <div key={bloodType} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                      {bloodType}
                    </label>
                    
                    <div className="mb-1 text-center text-xs text-gray-500">
                      <div>Available: {available} units</div>
                      
                    </div>
                    
                    <input
                      type="number"
                      min="0"
                      max={available}
                      value={units}
                      onChange={(e) => handleBloodUnitChange(bloodType, e.target.value)}
                      className={`w-full p-2 border rounded-lg text-center ${
                        errors[bloodType] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    
                    {errors[bloodType] && (
                      <div className="text-red-500 text-xs mt-1 text-center">
                        {errors[bloodType]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-right font-medium">
              Total Units to Donate: {totalUnits}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || totalUnits === 0 || hasErrors}
              className={`w-full px-6 py-3 rounded-lg text-white font-medium ${
                isSubmitting || totalUnits === 0 || hasErrors
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-800 hover:bg-red-900'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Donation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonateBloodOrg;