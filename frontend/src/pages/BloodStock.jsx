import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrgDataContext } from '../context/OrgContext';
import axios from 'axios';

const BloodStock = () => {
    const navigate = useNavigate();
  const { org, setOrg } = useContext(OrgDataContext);
  const [bloodStock, setBloodStock] = useState({
    'A+': 0,
    'A-': 0,
    'B+': 0,
    'B-': 0,
    'AB+': 0,
    'AB-': 0,
    'O+': 0,
    'O-': 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bloodType: 'A+',
    units: 1,
    action: 'add'
  });

  useEffect(() => {
    const fetchBloodStock = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/org/blood-stock`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBloodStock(response.data.bloodStock);
      } catch (error) {
        console.error("Error fetching blood stock:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBloodStock();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/org/blood-stock`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 200) {
        setBloodStock(response.data.updatedStock);
        setOrg(prev => ({ ...prev, bloodStock: response.data.updatedStock }));
        setIsEditing(false);
        setFormData({
          bloodType: 'A+',
          units: 1,
          action: 'add'
        });
      }
    } catch (error) {
      console.error("Error updating blood stock:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button onClick={()=>{navigate('/home-org')}}><i className="ri-arrow-left-s-line text-2xl font-medium"></i></button>
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Blood Stock Management</h1>
          <p className="text-gray-600">Current blood inventory status</p>
        </div>

        {/* Blood Stock Summary */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
  {Object.entries(bloodStock)
    .filter(([key]) => 
      ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(key)
    )
    .map(([type, units]) => (
      <div key={type} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-800">
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">{type}</span>
          <span className="text-xl font-bold">{units} units</span>
        </div>
      </div>
    ))
  }
</div>

        {/* Update Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-2 rounded-lg ${isEditing ? 'bg-gray-200 text-gray-800' : 'bg-red-800 text-white'}`}
          >
            {isEditing ? 'Cancel' : 'Update Stock'}
          </button>
        </div>

        {/* Update Form */}
        {isEditing && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center">Update Blood Stock</h2>
            <form onSubmit={handleUpdateStock} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  {Object.keys(bloodStock).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <select
                  name="action"
                  value={formData.action}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="add">Add to Stock</option>
                  <option value="remove">Remove from Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
                <input
                  type="number"
                  name="units"
                  min="1"
                  value={formData.units}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900"
                >
                  Update Stock
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodStock;