import React from 'react';
import HeroSlider from '../HeroSlider/HeroSlider';
import Brands from '../Brands/Brands';
import AboutUs from '../AboutUs/AboutUs';
import LatestTuition from '../LatestTuition/LatestTuition';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';

const Home = () => {
    return (
        <>
            <section className='hero-ection'>
                <HeroSlider></HeroSlider>
            </section>

            <section>
                <Brands></Brands>
            </section>

            <section className='about-us pt-16 pb-4 md:pt-[72px] md:pb-6 lg:pt-[104px] lg:pb-14'>
                <AboutUs></AboutUs>
            </section>

            <section className='pt-10 pb-4 md:pt-14 md:pb-8 lg:pt-20 lg:pb-14 bg-content-bg'>
                <LatestTuition></LatestTuition>
            </section>

            <section className='pt-10 pb-4 lg:py-20'>
                <div className='relative before:content-[""] before:w-full before:h-[440px] before:absolute before:bottom-0 bg-none lg:before:bg-content-bg'>
                    <WhyChooseUs></WhyChooseUs>
                </div>
            </section>
        </>
    );
};

export default Home;