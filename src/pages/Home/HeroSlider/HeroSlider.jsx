import React from 'react';
import { Link } from 'react-router';
import heroImage from '../../../assets/hero-image.png';

const HeroSlider = () => {
    return (
        <div className='mt-[92px] lg:mt-[118px] py-5 lg:py-[72px] relative'>
            <div className='container'>
                <div className='hero-slider-content z-20 relative'>
                    <div className='flex flex-wrap -mx-3 items-center'>
                        <div className='w-full lg:w-6/12 px-3 mb-7 lg:mb-0'>
                            <h1 className='text-[26px] sm:text-[28px] md:text-[34px] md:max-w-[558px] lg:max-w-none lg:text-[44px] 2xl:text-[55px] font-bold text-dark-09 mb-3 lg:mb-3.5'>Connect Students and Tutors in One <span className='text-white bg-theme-primary rounded-md py-px px-3.5'>Smart</span> Platform</h1>
                            <p className='max-w-[558px] text-base lg:text-lg'>Easily post tuitions, apply as a tutor, and stay connected, all in one seamless platform.</p>
                            <Link to='/' className='button button-fill inline-block mt-4 lg:mt-6'>Get Started</Link>
                        </div>
                        <div className='w-full lg:w-6/12 px-3'>
                            <div className='hero-image-wrap'>
                                <div className='hero-image bg-content-bg rounded-full m-auto lg:m-0 lg:ml-auto relative overflow-hidden'>
                                    <img src={heroImage} className='absolute z-20 top-[50%] left-[50%] -translate-x-[53%] -translate-y-[46%]' alt='hero image' />
                                    <svg className='animate-rotate absolute top-[50%] left-[50%] -translate-[50%] z-10' width="537" height="537" viewBox="0 0 503 503" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M497 251.5C500.314 251.5 503.007 248.813 502.928 245.5C502.016 207.28 492.401 169.742 474.782 135.753C456.242 99.9879 429.381 69.1995 396.461 45.9797C363.54 22.7598 325.524 7.78786 285.611 2.32398C245.698 -3.1399 205.056 1.06417 167.106 14.5824C129.157 28.1005 95.01 50.5372 67.5397 80.0041C40.0694 109.471 20.0796 145.106 9.25286 183.909C-1.57393 222.712 -2.92091 263.548 5.32529 302.981C13.1618 340.454 29.4439 375.617 52.9006 405.807C54.9337 408.423 58.7196 408.802 61.2871 406.707L103.805 372.014C106.372 369.919 106.747 366.145 104.737 363.511C88.0398 341.634 76.429 316.279 70.7854 289.291C64.7319 260.345 65.7207 230.367 73.6686 201.882C81.6164 173.397 96.2907 147.238 116.456 125.606C136.622 103.975 161.689 87.5045 189.547 77.5809C217.406 67.6573 247.241 64.5712 276.54 68.5821C305.84 72.5931 333.748 83.5839 357.914 100.629C382.081 117.675 401.799 140.276 415.409 166.531C428.098 191.009 435.132 217.995 436.026 245.501C436.134 248.813 438.81 251.5 442.124 251.5H497Z" fill="url(#paint0_linear_38_2)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_38_2" x1="380.5" y1="-112.5" x2="9.0296e-06" y2="449.5" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00A3FF" />
                                                <stop offset="0.987548" stop-color="white" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Elements */}
            <div>
                <div className='absolute w-[258px] h-[258px] bg-[linear-gradient(0deg,#FFA2F9,#FFA2F9)] blur-[182px] rounded-full top-0 left-[18px] md:left-[34px] lg:left-[39%] z-10'></div>
                <div className='hidden lg:block absolute w-[258px] h-[258px] bg-[linear-gradient(0deg,#FFCD20,#FFCD20)] blur-[182px] rounded-full top-[50%] left-[-171px] -translate-y-[20%] z-10'></div>
            </div>
        </div>
    );
};

export default HeroSlider;