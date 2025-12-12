import React from 'react';
import forbiddenAnimation from '../../assets/animations/forbidden403.json';
import Lottie from 'lottie-react';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className='py-10 lg:py-20 mx-auto text-center'>
            <div className='w-[190px] md:w-[200px] lg:w-[250px] mx-auto mb-6'>
                <Lottie
                    animationData={forbiddenAnimation}
                    loop={false}
                ></Lottie>
            </div>
            <h1 className='text-dark-09 font-semibold mb-4 text-center text-2xl md:text-3xl lg:text-4xl'>You're not permitted to see this.</h1>
            <Link to='/dashboard/overview' className='btn btn-info'>Return Home</Link>
        </div>
    );
};

export default Forbidden;