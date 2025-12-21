import React, { useEffect, useState } from 'react';
import Header from '../pages/Shared/Header/Header';
import { Outlet, useLocation } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import { FaChevronUp } from 'react-icons/fa';
import LoadingPage from '../components/LoadingPage/LoadingPage';

const RootLayout = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setloading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const location = useLocation();

    // Preloader
    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setloading(false), 500);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const startLoading = () => {
            setloading(true);
            setFadeOut(false);
        };

        startLoading();

        const handleLoad = () => {
            setFadeOut(true);
            setTimeout(() => setloading(false), 500);
        };


        if (document.readyState === 'complete') {
            const timer = setTimeout(handleLoad, 1000);
            return () => clearTimeout(timer);
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, [location.pathname]);

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
            {loading ? (
                <div className={`h-screen flex justify-center items-center ${fadeOut ? 'scale-150 duration-700 opacity-0 invisible' : ''}`}>
                    <LoadingPage></LoadingPage>
                </div>
            ) : (
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
                        <footer className='main-footer bg-dark-09 text-dark-04'>
                            <Footer></Footer>
                        </footer>
                        {/* Footer End */}
                    </div>
                    {/* Main Wrapper End */}

                    {/* Retun to top button */}
                    <div onClick={handleScrollToTop} data-tip='Return to top' className={`${isVisible ? 'bottom-2.5 opacity-100' : '-bottom-4 opacity-0'} tooltip tooltip-left fixed right-2.5 w-11 h-11 flex items-center justify-center rounded-full text-white bg-gray-400 hover:bg-gray-500 duration-300 cursor-pointer z-50`}>
                        <FaChevronUp />
                    </div>
                </>
            )}
        </>
    );
};

export default RootLayout;