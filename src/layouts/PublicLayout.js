import React from 'react';
import Navbar from '../components/navbar/Navbar'; 
import Footer from '../components/Footer/Footer'; 
import ScrollToTopButton from '../components/ScrollToTopButton';

const PublicLayout = ({ children }) => {
    const layoutStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    };

    const mainContentStyle = {
        flex: 1,
    };

    return (
        <div style={layoutStyle}>
            <Navbar />
            <main style={mainContentStyle}>
                {children}
            </main>
            <Footer />
            
            
            <ScrollToTopButton /> 
        </div>
    );
};

export default PublicLayout;