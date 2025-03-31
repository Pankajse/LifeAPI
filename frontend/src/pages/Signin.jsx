import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';

const Signin = () => {
  
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSubmitHandler = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className='flex flex-col h-screen items-center bottom-24 relative justify-center '>
      <h3 className='text-2xl font-semibold mb-14'>Login</h3>
      <form onSubmit={onSubmitHandler}>
        <h4 className='text-lg font-medium'>E-mail</h4>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} required className='w-full rounded-lg my-3 py-1.5 px-2 text-base outline-2 outline-gray-300 ' type="text" placeholder='Enter your email' />
        <h4 className='text-lg font-medium'>Password</h4>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} required className='w-full rounded-lg my-3 py-1.5 px-2 text-base outline-2 outline-gray-300 ' type="password" placeholder='Enter your password' />
        <button className='bg-red-800 text-white text-lg font-normal w-full py-1.5 px-2'>Signup</button>
      </form>
      <div className='flex gap-2 my-3'>
        <p>Don't have a account</p>
        <Link to='/signup' className='text-blue-600'>Create account</Link>
      </div>
    </div>
  );
};

export default Signin;