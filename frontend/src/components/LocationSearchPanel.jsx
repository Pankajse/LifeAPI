import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSearchPanel = ({ address, setAddress, onSelect }) => {
    const [locationSuggestions, setLocationSuggestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/location/autoSuggestion`, {
                    params: {
                        input: address,
                    },
                    headers : {
                        Authorization : `bearer ${localStorage.getItem('token')}`
                    }
                });

                // Ensure the response is an array
                if (Array.isArray(response.data)) {
                    setLocationSuggestions(response.data);
                } else {
                    console.error("Unexpected API response format:", response.data);
                    setLocationSuggestions([]); // Set to empty array if the response is invalid
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setLocationSuggestions([]); // Set to empty array on error
            }
        };

        if (address.length >= 3) {
            const timeoutId = setTimeout(fetchData, 600);
            return () => clearTimeout(timeoutId); // Cleanup timeout
        } else {
            setLocationSuggestions([]); // Clear suggestions if input is too short
        }
    }, [address]);

    // Safely map over locationSuggestions
    const locationArray = locationSuggestions
        .map((element) => element?.structured_formatting) // Use optional chaining to avoid errors
        .filter((element) => element); // Filter out undefined/null values

    // Limit the number of suggestions to 5
    const limitedLocationArray = locationArray.slice(0, 5);

    return (
        <div className="m-3">
            {limitedLocationArray.length > 0 ? (
                limitedLocationArray.map((element, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setAddress(`${element.main_text} ${element.secondary_text}`);
                            onSelect(); // Close the panel after selection
                        }}
                        className="flex items-center gap-3 p-1 rounded-xl bg-white my-1 border-gray-100 border-2 active:border-black cursor-pointer"
                    >
                        <i className="ri-map-pin-2-fill text-xl bg-gray-200 rounded-full p-2"></i>
                        <div>
                            <h3 className="text-base font-normal">{element.main_text}</h3>
                            <h4 className="text-sm font-normal">{element.secondary_text}</h4>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No suggestions found</p>
            )}
        </div>
    );
};

export default LocationSearchPanel;