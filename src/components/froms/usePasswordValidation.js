import { useState } from 'react';

const usePasswordValidation = () => {
    const [errors, setErrors] = useState({});

    const validate = (password, confirmPassword) => {
        const newErrors = {};

        if (password.length < 8) {
            newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
        } 
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            newErrors.password = 'รหัสผ่านต้องประกอบด้วยตัวพิมพ์เล็ก, พิมพ์ใหญ่, ตัวเลข, และอักขระพิเศษ';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
        }

        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    return { errors, validate };
};

export default usePasswordValidation;