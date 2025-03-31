import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { OrgDataContext } from '../context/OrgContext';

const SigninOrg = () => {
  const navigate = useNavigate();
  const { setOrg } = useContext(OrgDataContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/org/signin`, {
        email: formData.email,
        password: formData.password
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setOrg(response.data.org); 
        navigate('/home-org');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-screen items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Organization Login</h2>
          <p className='text-gray-600'>Access your organization dashboard</p>
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-100 text-red-700 rounded text-sm'>
            {error}
          </div>
        )}

        <form onSubmit={onSubmitHandler} className='space-y-6'>
          {/* Email Field */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
              Organization Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500'
              placeholder='your@organization.com'
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500'
              placeholder='••••••••'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              loading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>
                Don't have an organization account?
              </span>
            </div>
          </div>

          <div className='mt-4'>
            <Link
              to='/signup-org'
              className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              Register your organization
            </Link>
          </div>
        </div>

        {/* Optional: Different login method */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Are you an individual?{' '}
            <Link to='/signin' className='text-red-600 font-medium hover:underline'>
              Sign in as user
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninOrg;