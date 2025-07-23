const usePasswordValidation = () => {
    
    const validate = (password, confirmPassword) => {
        const errors = { password: '', confirmPassword: '' };
        let isValid = true;

        if (!password) {
            errors.password = 'กรุณากรอกรหัสผ่าน';
            isValid = false;
        } else if (password.length < 8) {
            errors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
            isValid = false;
        } else if (!/[a-z]/.test(password)) {
            errors.password = 'ต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว';
            isValid = false;
        } else if (!/[A-Z]/.test(password)) {
            errors.password = 'ต้องมีตัวอักษรพิมพ์ใหญ่อยน้อย 1 ตัว';
            isValid = false;
        } else if (!/[0-9]/.test(password)) {
            errors.password = 'ต้องมีตัวเลขอย่างน้อย 1 ตัว';
            isValid = false;
        }

        if (!confirmPassword) {
            errors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
            isValid = false;
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน';
            isValid = false;
        }
        
        // คืนค่าทั้งสถานะความถูกต้องและ object error
        return { isValid, errors };
    };

    // คืนค่าเฉพาะฟังก์ชัน validate ออกไป
    return { validate };
};

export default usePasswordValidation;