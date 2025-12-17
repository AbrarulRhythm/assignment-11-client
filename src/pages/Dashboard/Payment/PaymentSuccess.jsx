import React, { useEffect, useState } from 'react';
import paymentSuccess from '../../../assets/animations/payment-success.json';
import Lottie from 'lottie-react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    const [paymentInfo, setPaymentInfo] = useState({});

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                    });

                    if (res.data.modifiedTution.modifiedCount) {
                        toast.success('Payment Successfully 🎉');
                    }
                })
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className='dashboard'>
            <title>Payment Success</title>

            <div className='text-center mb-8'>
                <div className='w-[150px] md:w-[250px] mx-auto'>
                    <Lottie animationData={paymentSuccess} loop={false}
                    ></Lottie>
                </div>
                <h2 className='text-dark-09 font-semibold text-2xl md:text-3xl lg:text-4xl mb-3'>Payment successful!</h2>
                <p>Your Transaction ID: <span className='font-medium text-dark-07'>{paymentInfo.transactionId}</span></p>
            </div>
        </div>
    );
};

export default PaymentSuccess;