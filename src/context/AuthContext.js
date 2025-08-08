import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    return rememberMe && savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    return rememberMe && !!localStorage.getItem("user");
  });

  const [registeredEvents, setRegisteredEvents] = useState([]);

  const login = (userData, remember = false) => {
  const fullUserData = {
    id: userData.id,
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    is_verified: userData.is_verified,
    currentPlan: userData.membership_type, // ใช้ membership_type จาก API
    memberType: userData.member_type, // ใช้ member_type จาก API
    role: "member", // กำหนดค่าเริ่มต้นเป็น member
    // ถ้ามีข้อมูลอื่นๆ จาก API ก็เพิ่มที่นี่
  };

  localStorage.setItem("user", JSON.stringify(fullUserData));
  localStorage.setItem("rememberMe", remember.toString());

  setUser(fullUserData);
  setIsLoggedIn(true);
};

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");

    setUser(null);
    setIsLoggedIn(false);
    setRegisteredEvents([]);
  };

  const registerForEvent = (eventId) => {
    setRegisteredEvents((prev) => {
      if (prev.includes(eventId)) return prev;
      return [...prev, eventId];
    });
  };

  const unregisterFromEvent = (eventId) => {
    setRegisteredEvents((prev) => prev.filter((id) => id !== Number(eventId)));
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
    isRegisteredForEvent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
