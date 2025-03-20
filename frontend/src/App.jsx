import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import RequestBloodForm from './pages/RequestBloodForm';
import DonateBloodform from './pages/DonateBloodform';
import Donors from './pages/Donors';
import Profile from './pages/Profile';

export const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Start/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/request-blood-form' element={<RequestBloodForm/>} />
      <Route path='/donate-blood-form' element={<DonateBloodform/>} />
      <Route path='/donors' element={<Donors/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
    {/* <div className='relative bottom-2'>
      <Navbar/>
    </div> */}
    </div>
  )
}

export default App;
