import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';

const Signin = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true);
    
    const users = {
      email,
      password
    };
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin`, users);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        setUser(data.user); 
        setEmail('');
        setPassword('');
        navigate('/home');
      }
    } catch (error) {
      console.error("Signin error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || 'Invalid credentials. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('Network error. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-screen items-center bottom-24 relative justify-center '>
      <h3 className='text-2xl font-semibold mb-14'>Login</h3>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg w-full max-w-xs text-center">
          {error}
        </div>
      )}
      <form onSubmit={onSubmitHandler} className="w-full max-w-xs">
        <h4 className='text-lg font-medium'>E-mail</h4>
        <input 
          value={email} 
          onChange={(e) => { setEmail(e.target.value) }} 
          required 
          className='w-full rounded-lg my-3 py-1.5 px-2 text-base outline-2 outline-gray-300 border border-gray-300' 
          type="email" 
          placeholder='Enter your email' 
        />
        <h4 className='text-lg font-medium'>Password</h4>
        <input 
          value={password} 
          onChange={(e) => { setPassword(e.target.value) }} 
          required 
          className='w-full rounded-lg my-3 py-1.5 px-2 text-base outline-2 outline-gray-300 border border-gray-300' 
          type="password" 
          placeholder='Enter your password' 
        />
        <button 
          type="submit"
          disabled={isLoading}
          className={`bg-red-800 text-white text-lg font-normal w-full py-1.5 px-2 rounded-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-900'}`}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <div className='flex gap-2 my-3'>
        <p>Don't have an account?</p>
        <Link to='/signup' className='text-blue-600 hover:text-blue-800'>Create account</Link>
      </div>
    </div>
  );
};

export default Signin;