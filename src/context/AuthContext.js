import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return !!localStorage.getItem('user'); 
    });

    const [registeredEvents, setRegisteredEvents] = useState([]);

    const login = (userData) => {
        const fullUserData = { ...userData, currentPlan: 'corporate', memberType: 'corporate',role: 'admin' };
        
        localStorage.setItem('user', JSON.stringify(fullUserData)); 

        setUser(fullUserData);
        setIsLoggedIn(true);
        setRegisteredEvents([1, 5]); 
    };

    const logout = () => {
        localStorage.removeItem('user');

        setUser(null);
        setIsLoggedIn(false);
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