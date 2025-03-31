import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';

const Signup = () => {

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext)
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const users = {
      fullname,
      email,
      password
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, users);
      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        console.log(user)
        localStorage.setItem('token', data.token)
        setFullname('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        navigate('/home')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='flex flex-col h-screen items-center justify-center relative bottom-16'>
      <h3 className='text-2xl font-semibold mb-14'>Create Account</h3>
      <form onSubmit={(e) => { onSubmitHandler(e) }}>
        <h4 className='text-lg font-medium'>Full Name</h4>
        <input value={fullname} onChange={(e) => { setFullname(e.target.value) }} required className='w-full rounded-lg my-3 py-1.5 px-2 text-base outline-2 outline-gray-300 ' type="text" placeholder='Enter your email' />
        <h4 className='text-lg font-medium'>E-mail</h4>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} required className='w-full rounded-lg my-3 py-1.5 px-2 text-base outline-2 outline-gray-300 ' type="text" placeholder='Enter your email' />
        <h4 className='text-lg font-medium'>Password</h4>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} required className='w-full rounded-lg my-3 py-1.5 px-2 text-base outline-2 outline-gray-300 ' type="password" placeholder='Enter your password' />
        <h4 className='text-lg font-medium'>Confirm Password</h4>
        <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} required className='w-full rounded-lg my-3 py-1.5 px-2 text-base outline-2 outline-gray-300 ' type="password" placeholder='Enter your password' />
        <button className='bg-red-800 text-white text-lg font-normal w-full py-1.5 px-2'>Signup</button>
      </form>
      <div className='flex gap-2 my-3'>
        <p>Already have a account</p>
        <Link to='/signin' className='text-blue-600'>Login</Link>
      </div>
    </div>
  )
}

export default Signup