import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NearbyDonorsOrganizations = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestedIds, setRequestedIds] = useState([]);

  useEffect(() => {
    const fetchNearbyDonorsOrgs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/org/nearby-donors-orgs`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const sortedResults = response.data.results?.sort((a, b) => {
          const distanceA = parseFloat(a.distance.split(' ')[0]) * (a.distance.includes('km') ? 1000 : 1);
          const distanceB = parseFloat(b.distance.split(' ')[0]) * (b.distance.includes('km') ? 1000 : 1);
          return distanceA - distanceB;
        });
        
        setResults(sortedResults || []);
      } catch (err) {
        setError('Failed to fetch nearby donors and organizations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyDonorsOrgs();
  }, []);

  const handleRequest = async (id, type) => {
    try {
      // Add to requestedIds immediately for responsive UI
      setRequestedIds(prev => [...prev, id]);
      
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/chat/start`,
        { participantId : id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      alert('Request sent successfully!');
    } catch (err) {
      console.error('Error sending request:', err);
      alert('Failed to send request');
      // Remove from requestedIds if request failed
      setRequestedIds(prev => prev.filter(requestedId => requestedId !== id));
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'user':
        return '🧑';
      case 'bloodbank':
        return '🩸';
      case 'hospital':
        return '🏥';
      case 'ngo':
        return '🤝';
      default:
        return '❓';
    }
  };

  const renderBloodStock = (bloodStock) => {
    if (!bloodStock) return null;
    
    return (
      <div className="mt-2">
        <p className="font-medium text-sm mb-1">Blood Stock:</p>
        <div className="grid grid-cols-2 gap-1 text-sm">
          {Object.entries(bloodStock).map(([bloodType, units]) => (
            units > 0 && (
              <div key={bloodType} className="flex justify-between">
                <span>{bloodType}:</span>
                <span className="font-semibold">{units} units</span>
              </div>
            )
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Nearby Donors & Organizations</h1>
      
      {!results || results.length === 0 ? (
        <div className="text-center text-gray-500">No nearby donors or organizations found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => {
            const isRequested = requestedIds.includes(item._id);
            
            return (
              <div key={item._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{getTypeIcon(item.type)}</span>
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600 capitalize">{item.type}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.distance} away ({item.duration})
                  </p>

                  {item.type === 'user' ? (
                    <>
                      <p>Blood Group: <span className="font-semibold">{item.bloodGroup}</span></p>
                      <p>Available: <span className="font-semibold">{new Date(item.availability).toLocaleDateString()}</span></p>
                      <p>Age: <span className="font-semibold">{item.age}</span>, Weight: <span className="font-semibold">{item.weight} kg</span></p>
                    </>
                  ) : (
                    <>
                      <p>Total Units: <span className="font-semibold">{item.units}</span></p>
                      {renderBloodStock(item.bloodStock)}
                    </>
                  )}

                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {item.contact}
                  </p>
                </div>

                <button
                  onClick={() => !isRequested && handleRequest(item._id, item.type === 'user' ? 'user' : 'org')}
                  disabled={isRequested}
                  className={`w-full py-2 px-4 rounded-md transition duration-200 ${
                    isRequested 
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {isRequested ? 'Requested' : 'Request'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NearbyDonorsOrganizations;
