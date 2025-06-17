import React, { useState, useEffect } from 'react';
import { ArrowUpCircleFill } from 'react-bootstrap-icons';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // ฟังก์ชันนี้จะถูกเรียกเมื่อมีการ scroll
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // ฟังก์ชันสำหรับเลื่อนหน้ากลับไปด้านบนสุด
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const buttonStyle = {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        height: '50px',
        width: '50px',
        fontSize: '40px',
        zIndex: 1000,
        cursor: 'pointer',
        color: '#3B82F6', 
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? 'scale(1)' : 'scale(0.5)', 
        pointerEvents: isVisible ? 'auto' : 'none', 
    };

    return (
        <div onClick={scrollToTop}>
            <ArrowUpCircleFill style={buttonStyle} />
        </div>
    );
};

export default ScrollToTopButton;