import React from 'react';
import HeroSlider from '../HeroSlider/HeroSlider';
import Brands from '../Brands/Brands';

const Home = () => {
    return (
        <>
            <section className='hero-ection'>
                <HeroSlider></HeroSlider>
            </section>

            <section>
                <Brands></Brands>
            </section>
        </>
    );
};

export default Home;