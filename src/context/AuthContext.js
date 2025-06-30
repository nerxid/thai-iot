import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [registeredEvents, setRegisteredEvents] = useState([]);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser({ ...userData, currentPlan: 'corporate', memberType: 'corporate' }); 
        setRegisteredEvents([1, 5]); 
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setRegisteredEvents([]);
    };

    const registerForEvent = (eventId) => {
        setRegisteredEvents(prev => {
            if (prev.includes(eventId)) return prev;
            return [...prev, eventId];
        });
    };

    const unregisterFromEvent = (eventId) => {
        setRegisteredEvents(prev => prev.filter(id => id !== Number(eventId)));
    };

    const isRegisteredForEvent = (eventId) => {
        return registeredEvents.includes(Number(eventId));
    };

    const value = { 
        isLoggedIn, 
        user, 
        login, 
        logout,
        registerForEvent,
        unregisterFromEvent,
        isRegisteredForEvent
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};