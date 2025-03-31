import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import RequestBlood from './pages/RequestBlood';
import DonateBlood from './pages/DonateBlood';
import Donors from './pages/Donors';
import Profile from './pages/Profile';
import NearbyDonorsOrgs from './pages/NearbyDonorsOrgs';
import RequestBloodLater from './components/RequestBloodLater';
import DonateBloodSub from './components/DonateBloodSubmitted';
import Chatbot from './pages/Chatbot';
import LoginOptions from './pages/LoginOptions';
import SignupOrg from './pages/SignupOrg';
import SigninOrg from './pages/SigninOrg';
import HomeOrg from './pages/HomeOrg';
import BloodStock from './pages/BloodStock';
import DonateBloodOrg from './pages/DonateBloodOrg';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Start/>} />
      <Route path='/login-options' element={<LoginOptions/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/signup-org' element={<SignupOrg/>} />
      <Route path='/signin-org' element={<SigninOrg/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/home-org' element={<HomeOrg/>} />
      <Route path='/request-blood' element={<RequestBlood/>} />
      <Route path='/donate-blood' element={<DonateBlood/>} />
      <Route path='/donate-blood-org' element={<DonateBloodOrg/>} />
      <Route path='/donate-blood-sub' element={<DonateBloodSub/>} />
      <Route path='/donors' element={<Donors/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/nearby-donors-orgs' element={<NearbyDonorsOrgs/>} />
      <Route path='/request-blood-later' element={<RequestBloodLater/>} />
      <Route path='/chatbot' element={<Chatbot/>} />
      <Route path='/blood-stock' element={<BloodStock/>} />
    </Routes>
  )
}

export default App;
