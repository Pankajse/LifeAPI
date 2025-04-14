import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LocationSearchPanel from '../components/LocationSearchPanel';
import { OrgDataContext } from '../context/OrgContext';

const SignupOrg = () => {
  const navigate = useNavigate();
  const { setOrg } = useContext(OrgDataContext);
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    orgType: 'bloodbank', // default value
    contactNumber: '',
    registrationNumber: ''
  });
  const [showLocationPanel, setShowLocationPanel] = useState(false);
  const [error, setError] = useState('');

  const orgTypes = [
    { value: 'bloodbank', label: 'Blood Bank' },
    { value: 'hospital', label: 'Hospital' },
    { value: 'ngo', label: 'NGO' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength (optional)
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/org/signup`, {
        orgName: formData.orgName,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        orgType: formData.orgType,
        contactNumber: formData.contactNumber,
        registrationNumber: formData.registrationNumber
      });

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        setOrg(response.data.org); 
        navigate('/home-org'); // Redirect to organization dashboard
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h3 className='text-2xl font-semibold mb-6 text-center'>Organization Registration</h3>
        
        {error && (
          <div className='mb-4 p-2 bg-red-100 text-red-700 rounded text-sm'>
            {error}
          </div>
        )}

        <form onSubmit={onSubmitHandler} className='space-y-4'>
          {/* Organization Name */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-1'>Organization Name</label>
            <input
              name='orgName'
              value={formData.orgName}
              onChange={handleChange}
              required
              className='w-full rounded-lg p-2 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              placeholder='Enter organization name'
            />
          </div>

          {/* Email */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-1'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full rounded-lg p-2 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              placeholder='Enter organization email'
            />
          </div>

          {/* Password */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-1'>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              className='w-full rounded-lg p-2 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              placeholder='Enter password (min 8 characters)'
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-1'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className='w-full rounded-lg p-2 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              placeholder='Confirm your password'
            />
          </div>

          {/* Organization Type */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-1'>Organization Type</label>
            <select
              name='orgType'
              value={formData.orgType}
              onChange={handleChange}
              required
              className='w-full rounded-lg p-2 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
            >
              {orgTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Address with Location Search */}
          <div className='relative'>
            <label className='block text-gray-700 text-sm font-medium mb-1'>Address</label>
            <input
              type='text'
              name='address'
              value={formData.address}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, address: e.target.value }));
                setShowLocationPanel(e.target.value.length >= 3);
              }}
              required
              className='w-full rounded-lg p-2 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              placeholder='Enter organization address'
            />
            {showLocationPanel && (
              <div className='absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                <LocationSearchPanel
                  address={formData.address}
                  setAddress={(address) => {
                    setFormData(prev => ({ ...prev, address }));
                    setShowLocationPanel(false);
                  }}
                  onSelect={() => setShowLocationPanel(false)}
                />
              </div>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-1'>Contact Number</label>
            <input
              type='tel'
              name='contactNumber'
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className='w-full rounded-lg p-2 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              placeholder='Enter contact number'
            />
          </div>

          {/* Registration Number (optional) */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-1'>Registration Number</label>
            <input
              name='registrationNumber'
              value={formData.registrationNumber}
              onChange={handleChange}
              className='w-full rounded-lg p-2 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              placeholder='Enter registration number (if applicable)'
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className='w-full bg-red-800 text-white py-2 px-4 rounded-lg hover:bg-red-900 transition-colors font-medium'
            >
              Register Organization
            </button>
          </div>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-gray-600'>
            Already have an account?{' '}
            <Link to='/signin-org' className='text-red-800 hover:underline'>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupOrg;