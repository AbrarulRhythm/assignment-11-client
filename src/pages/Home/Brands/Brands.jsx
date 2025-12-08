import React from 'react';
import brand01 from '../../../assets/brands/brand1.png';
import brand02 from '../../../assets/brands/brand2.png';
import brand03 from '../../../assets/brands/brand3.png';
import brand04 from '../../../assets/brands/brand4.png';
import brand05 from '../../../assets/brands/brand5.png';
import Marquee from 'react-fast-marquee';

const Brands = () => {
    return (
        <div className='container'>
            <div className='bg-content-bg p-6 lg:px-12 lg:py-[34px] rounded-md mt-6 lg:mt-0'>
                <Marquee pauseOnHover={true}>
                    <div className='brand-image'>
                        <img src={brand01} alt='Brand Logo' />
                    </div>
                    <div className='brand-image'>
                        <img src={brand02} alt='Brand Logo' />
                    </div>
                    <div className='brand-image'>
                        <img src={brand03} alt='Brand Logo' />
                    </div>
                    <div className='brand-image'>
                        <img src={brand04} alt='Brand Logo' />
                    </div>
                    <div className='brand-image'>
                        <img src={brand05} alt='Brand Logo' />
                    </div>
                    <div className='brand-image'>
                        <img src={brand01} alt='Brand Logo' />
                    </div>
                    <div className='brand-image'>
                        <img src={brand02} alt='Brand Logo' />
                    </div>
                    <div className='brand-image'>
                        <img src={brand03} alt='Brand Logo' />
                    </div>
                    <div className='brand-image'>
                        <img src={brand04} alt='Brand Logo' />
                    </div>
                    <div className='brand-image'>
                        <img src={brand05} alt='Brand Logo' />
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default Brands;