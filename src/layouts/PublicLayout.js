import React from 'react';
import Navbar from '../components/navbar/Navbar'; 
import Footer from '../components/Footer/Footer'; 
import ScrollToTopButton from '../components/ScrollToTopButton';
import './PublicLayout.css';

const PublicLayout = ({ children }) => {
    return (
        <div className="public-layout">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
            <ScrollToTopButton /> 
        </div>
    );
};

export default PublicLayout;