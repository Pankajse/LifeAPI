import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const OrgDataContext = createContext();

const OrgContext = ({ children }) => {
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrgData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/org/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        setOrg(response.data.org);
                    }
                }
            } catch (error) {
                console.error("Error fetching organization data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrgData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <OrgDataContext.Provider value={{ org, setOrg }}>
            {children}
        </OrgDataContext.Provider>
    );
};

export default OrgContext;