import React from 'react';
import paymentSuccess from '../../../assets/animations/payment-success.json';
import Lottie from 'lottie-react';

const PaymentSuccess = () => {
    return (
        <div className='dashboard'>
            <title>Payment Success</title>

            <div className='text-center mb-8'>
                <div className='w-[150px] md:w-[250px] mx-auto'>
                    <Lottie animationData={paymentSuccess} loop={false}
                    ></Lottie>
                </div>
                <h2 className='text-dark-09 font-semibold text-2xl md:text-3xl lg:text-4xl'>Payment successful!</h2>
            </div>
        </div>
    );
};

export default PaymentSuccess;