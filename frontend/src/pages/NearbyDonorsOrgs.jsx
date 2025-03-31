import React, { useState, useEffect, useContext } from 'react';
import { OrgDataContext } from '../context/OrgContext';
import axios from 'axios';
import { FaUser, FaHospital, FaMapMarkerAlt, FaPhone, FaTint, FaWeight, FaBirthdayCake } from 'react-icons/fa';

const NearbyDonorsOrgs = () => {
  const { org } = useContext(OrgDataContext);
  const [nearbyData, setNearbyData] = useState({
    nearbyDonors: [],
    nearbyOrgs: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNearbyDonorsOrgs = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/bloodServices/nearby-donors-orgs',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setNearbyData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch nearby donors and organizations');
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyDonorsOrgs();
  }, []);

  // Combine and sort by distance
  const combinedResults = [
    ...nearbyData.nearbyDonors.map(item => ({ ...item, type: 'donor' })),
    ...nearbyData.nearbyOrgs.map(item => ({ ...item, type: 'org' }))
  ].sort((a, b) => {
    // Extract numeric distance (remove " km")
    const distA = parseFloat(a.distance);
    const distB = parseFloat(b.distance);
    return distA - distB;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Nearby Blood Donors & Organizations</h1>
        
        {combinedResults.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">No nearby donors or organizations found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {combinedResults.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-start">
                  <div className="mr-4">
                    {item.type === 'donor' ? (
                      <div className="bg-blue-100 p-3 rounded-full">
                        <FaUser className="text-blue-600 text-xl" />
                      </div>
                    ) : (
                      <div className="bg-red-100 p-3 rounded-full">
                        <FaHospital className="text-red-600 text-xl" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-semibold">
                          {item.type === 'donor' ? item.user.fullname : item.orgName}
                        </h2>
                        {item.type === 'org' && (
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded capitalize">
                            {item.orgType}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          {item.distance} away
                        </div>
                        <div className="text-xs">{item.duration} travel time</div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <FaPhone className="mr-2" />
                        {item.type === 'donor' ? item.contact : item.contactNumber}
                      </div>

                      {item.type === 'donor' ? (
                        <>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <FaTint className="mr-2" />
                            Blood Type: {item.bloodType}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <FaWeight className="mr-2" />
                            Weight: {item.weight} kg
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <FaBirthdayCake className="mr-2" />
                            Age: {item.age}
                          </div>
                          {item.availability && (
                            <div className="text-sm text-gray-600">
                              Available: {new Date(item.availability.date).toLocaleDateString()} in {item.availability.city}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-sm text-gray-600">
                          Blood Stock: {Object.entries(item.donateBlood.bloodGroups)
                            .filter(([_, units]) => units > 0)
                            .map(([type, units]) => `${type}: ${units}`)
                            .join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyDonorsOrgs;