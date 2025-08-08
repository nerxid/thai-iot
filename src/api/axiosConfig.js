// src/api/axiosConfig.js
import axios from 'axios';

// สร้าง Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // URL ฐานของ API
  withCredentials: true, // ส่ง cookies กับทุก request
  xsrfCookieName: 'csrftoken', // ชื่อ cookie ของ CSRF token
  xsrfHeaderName: 'X-CSRFToken', // ชื่อ header ของ CSRF token
});

// เพิ่ม interceptor สำหรับการจัดการ CSRF token
axiosInstance.interceptors.request.use(config => {
  // ฟังก์ชันสำหรับดึงค่า cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // เพิ่ม CSRF token เข้าไปใน headers
  const csrfToken = getCookie('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;