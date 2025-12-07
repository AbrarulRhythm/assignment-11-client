import React, { useEffect, useState } from 'react';
import Header from '../pages/Shared/Header/Header';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import { FaChevronUp } from 'react-icons/fa';

const RootLayout = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Retun to top button
    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;

            if (scroll >= 250) {
                setIsVisible(true);
            }
            else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle Scroll top top
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <>
            {/* Main Wrapper */}
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
            {/* Main Wrapper End */}

            {/* Retun to top button */}
            <div onClick={handleScrollToTop} data-tip='Return to top' className={`${isVisible ? 'bottom-2.5 opacity-100' : '-bottom-4 opacity-0'} tooltip tooltip-left fixed right-2.5 w-11 h-11 flex items-center justify-center rounded-full text-white bg-gray-400 hover:bg-gray-500 duration-300 cursor-pointer`}>
                <FaChevronUp />
            </div>
        </>
    );
};

export default RootLayout;