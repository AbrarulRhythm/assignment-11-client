import React from 'react';
import HeroSlider from '../HeroSlider/HeroSlider';
import Brands from '../Brands/Brands';
import AboutUs from '../AboutUs/AboutUs';

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
        </>
    );
};

export default Home;