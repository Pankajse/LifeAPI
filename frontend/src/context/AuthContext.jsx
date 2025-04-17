import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const useAuth = createContext();

const AuthContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [org, setOrg] = useState(null);
    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/chat/auth-data`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        setUser(response.data.user);
                        setOrg(response.data.org);
                        setType(response.data.type);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <useAuth.Provider value={{user, org, type}}>
            {children}
        </useAuth.Provider>
    );
}

export default AuthContext;