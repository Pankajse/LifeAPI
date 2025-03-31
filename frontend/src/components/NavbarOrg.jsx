import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavbarOrg = () => {
    const location = useLocation();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <div className="flex justify-around items-center p-2">
                {[
                    { icon: 'ri-home-4-line', path: '/org/home', active: location.pathname === '/org/home' },
                    { icon: 'ri-drop-line', path: '/org/blood-stock', active: location.pathname.includes('blood-stock') },
                    { icon: 'ri-group-line', path: '/org/donors', active: location.pathname.includes('donors') },
                    { icon: 'ri-calendar-line', path: '/org/campaigns', active: location.pathname.includes('campaigns') },
                    { icon: 'ri-user-settings-line', path: '/org/settings', active: location.pathname.includes('settings') },
                ].map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`p-3 rounded-full ${item.active ? 'bg-red-100 text-red-800' : 'text-gray-600'}`}
                    >
                        <i className={`${item.icon} text-2xl`}></i>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NavbarOrg;