import React from 'react';
import Header from '../pages/Shared/Header/Header';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        // Main Wrapper
        <div className='main-wrapper'>
            {/* Header */}
            <header className='main-header'>
                <Header></Header>
            </header>
            {/* Header End */}

            {/* ==================== Mian Start ==================== */}
            <main className='site-main'>
                <Outlet></Outlet>
            </main>
            {/* ==================== Mian End ==================== */}

            {/* Footer */}
            <footer className='main-footer'>
                <Footer></Footer>
            </footer>
            {/* Footer End */}
        </div>
        // Main Wrapper End
    );
};

export default RootLayout;