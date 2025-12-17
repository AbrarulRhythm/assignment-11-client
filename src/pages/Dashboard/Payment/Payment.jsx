import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdInfoOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

const Payment = () => {
    const { id: applicationId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);

    const { isLoading, data: application } = useQuery({
        queryKey: ['applications', applicationId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor-request/${applicationId}`);
            return res.data;
        }
    });

    const handlePayment = async () => {
        try {
            setIsPaymentLoading(true);

            const paymentInfo = {
                tutorSalary: application.tutorSalary,
                tutorName: application.tutorName,
                tutorEmail: application.tutorEmail,
                studentEmail: application.studentEmail,
                applicationId: application._id,
                subjectName: application.subjectName,
                tuitionId: application.tuitionId
            }

            const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
            window.location.href = res.data.url;
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setIsPaymentLoading(false);
        }
    }

    return (
        <div className='dashboard'>
            <title>Payment</title>

            <div className='py-3 lg:py-5'>
                {/* Loading State */}
                {isLoading ? (
                    <div className='text-center mx-auto'>
                        <span className="loading loading-bars loading-xl"></span>
                    </div>
                ) : (
                    <>
                        {!application ? (
                            <div className='text-center'>
                                <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                <span className='text-base'>No application available at the moment.</span>
                            </div>
                        ) : (
                            // Data Row
                            <div>
                                <ul className='text-lg font-semibold w-full md:w-[40%] lg:w-[30%] space-y-3 mb-6'>
                                    <li className='flex items-center justify-between'>Subject : <span className='text-dark-09'>{application.subjectName}</span></li>
                                    <li className='flex items-center justify-between'>Tutor : <span className='text-dark-09'>{application.tutorName}</span></li>
                                </ul>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-xl font-semibold text-theme-primary'>৳{application.tutorSalary}</h3>
                                    <button
                                        onClick={handlePayment}
                                        disabled={isPaymentLoading}
                                        className='button button-fill'>
                                        {isPaymentLoading ? <><span className='loading loading-spinner loading-sm mr-1.5'></span> Pay Now</> : 'Pay Now'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Payment;