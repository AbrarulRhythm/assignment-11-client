import React from 'react';
import paymentCancle from '../../../assets/animations/payment-error.json';
import Lottie from 'lottie-react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='dashboard'>
            <title>Payment Cancelled</title>

            <div className='text-center mb-8'>
                <div className='w-[150px] md:w-[250px] mx-auto'>
                    <Lottie animationData={paymentCancle} loop={false}
                    ></Lottie>
                </div>
                <h2 className='text-dark-09 font-semibold text-2xl md:text-3xl lg:text-4xl mb-6'>Payment is cancelled!</h2>
                <Link to='/dashboard/applied-tutors' className='py-2.5 px-5 rounded-md text-white font-medium bg-theme-primary hover:shadow-btn-inner cursor-pointer'>Try Again</Link>
            </div>
        </div>
    );
};

export default PaymentCancelled;