import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setErrors([]); // Clear previous errors

    // Frontend validation
    if (formData.password !== formData.confirmPassword) {
      setErrors([{ msg: 'Passwords do not match' }]);
      return;
    }

    if (formData.password.length < 6) {
      setErrors([{ msg: 'Password should be at least 6 characters' }]);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password
      });

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response?.data?.errors) {
        // Backend validation errors
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.msg) {
        // General backend error message
        setErrors([{ msg: error.response.data.msg }]);
      } else {
        // Network or other errors
        setErrors([{ msg: 'An error occurred during signup. Please try again.' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-screen items-center justify-center relative bottom-16'>
      <h3 className='text-2xl font-semibold mb-6'>Create Account</h3>
      
      {/* Error display */}
      {errors.length > 0 && (
        <div className="mb-4 w-full max-w-xs">
          {errors.map((error, index) => (
            <div key={index} className="p-3 mb-2 bg-red-100 text-red-700 rounded-lg">
              {error.msg}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={onSubmitHandler} className="w-full max-w-xs">
        <h4 className='text-lg font-medium'>Full Name</h4>
        <input
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
          className='w-full rounded-lg my-3 py-1.5 px-2 text-base border border-gray-300'
          type="text"
          placeholder='Enter your full name'
        />

        <h4 className='text-lg font-medium'>E-mail</h4>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className='w-full rounded-lg my-3 py-1.5 px-2 text-base border border-gray-300'
          type="email"
          placeholder='Enter your email'
        />

        <h4 className='text-lg font-medium'>Password</h4>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className='w-full rounded-lg my-3 py-1.5 px-2 text-base border border-gray-300'
          type="password"
          placeholder='Enter your password (min 6 chars)'
          minLength="6"
        />

        <h4 className='text-lg font-medium'>Confirm Password</h4>
        <input
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className='w-full rounded-lg my-3 py-1.5 px-2 text-base border border-gray-300'
          type="password"
          placeholder='Confirm your password'
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-red-800 text-white text-lg font-normal w-full py-2 px-2 rounded-lg mt-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-900'}`}
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <div className='flex gap-2 my-3'>
        <p>Already have an account?</p>
        <Link to='/signin' className='text-blue-600 hover:text-blue-800'>Login</Link>
      </div>
    </div>
  );
};

export default Signup;