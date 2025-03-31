import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mt-14 lg:flex-row gap-6 p-4 w-full max-w-4xl mx-auto">
      {/* User Login Option */}
      <div 
        onClick={() => navigate('/signup')}
        className="flex-1 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-8 cursor-pointer 
        transition-all duration-300 hover:shadow-lg hover:border-red-400 hover:scale-[1.02]
        flex flex-col items-center justify-center text-center min-h-[200px]"
      >
        <div className="mb-4 bg-red-100 p-4 rounded-full">
          <i className="ri-user-3-fill text-4xl text-red-800"></i>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Login as a User</h3>
        <p className="text-lg text-gray-600">For individual donors and recipients</p>
      </div>

      {/* Organization Login Option */}
      <div 
        onClick={() => navigate('/signup-org')}
        className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 cursor-pointer 
        transition-all duration-300 hover:shadow-lg hover:border-blue-400 hover:scale-[1.02]
        flex flex-col items-center justify-center text-center min-h-[200px]"
      >
        <div className="mb-4 bg-blue-100 p-4 rounded-full">
          <i className="ri-community-fill text-4xl text-blue-800"></i>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Login as an Organization</h3>
        <p className="text-lg text-gray-600">(Hospitals, Blood Banks, NGOs)</p>
      </div>
    </div>
  );
};

export default LoginOptions;