import React, { useRef, useState } from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { MdInfoOutline } from 'react-icons/md';
import { LuEye } from 'react-icons/lu';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const paymentHistoryOpenModal = useRef();
    const [selectedPayment, setSelectedPayment] = useState([]);

    const { isLoading, data: payments } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    const openPaymentHistoryModal = (payment) => {
        paymentHistoryOpenModal.current.showModal();
        setSelectedPayment(payment);
    }

    return (
        <div className='dashboard'>
            <title>Payment History</title>

            <DashboardTitle
                title='Payment History'
            ></DashboardTitle>

            <div className="overflow-x-auto bg-white border border-dark-03 rounded-xl">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Subject Name</th>
                            <th>Turor</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Paid At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan='8' className='py-8 px-14'>
                                    <div className='text-start md:text-center'>
                                        <span className="loading loading-bars loading-lg"></span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <>
                                {/* Empty State */}
                                {(!payments || payments.length === 0) ? (
                                    <tr>
                                        <td colSpan='8' className='py-8 px-14'>
                                            <div className='text-center'>
                                                <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                                <span className='text-base'>No payments available at the moment.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    // Data Row
                                    payments.map((payment, index) => {
                                        return (
                                            <tr key={payment._id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <p className='w-[200px] lg:w-auto'>{payment.subjectName}</p>
                                                </td>
                                                <td>
                                                    <p className='w-[200px] lg:w-auto'>{payment.tutorName}</p>
                                                </td>
                                                <td>{payment.transactionId}</td>
                                                <td>${payment.amount}</td>
                                                <td>
                                                    <p className='w-[100px]'>{moment(payment.appliedAt).format('ll')}</p>
                                                    <p className='w-[100px]'>{moment(payment.appliedAt).format('LTS')}</p>
                                                </td>
                                                <td>
                                                    <div className='flex items-center justify-end gap-2'>
                                                        <button
                                                            onClick={() => openPaymentHistoryModal(payment)}
                                                            data-tip="Details" className='tooltip view-btn'><LuEye /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </>
                        )}
                    </tbody>
                </table>
            </div>

            <dialog ref={paymentHistoryOpenModal} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg">Payment History</h3>
                    <ul className='mt-6 space-y-3.5'>
                        <li>Subject Name: <span className='text-dark-08 font-medium'>{selectedPayment.subjectName}</span></li>
                        <li>Tutor Email: <span className='text-dark-08 font-medium'>{selectedPayment.tutorEmail}</span></li>
                        <li>Tutor Name: <span className='text-dark-08 font-medium'>{selectedPayment.tutorName}</span></li>
                        <li>Student Email: <span className='text-dark-08 font-medium'>{selectedPayment.customerEmail}</span></li>
                        <li>Payment Status: <span className='text-dark-08 font-medium'>{selectedPayment.paymentStatus}</span></li>
                        <li>Currency <span className='text-dark-08 font-medium'>{selectedPayment.currency}</span></li>
                        <li>Amount <span className='text-dark-08 font-medium'>${selectedPayment.amount}</span></li>
                        <li>Transaction ID <span className='text-dark-08 font-medium'>{selectedPayment.transactionId}</span></li>
                    </ul>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default PaymentHistory;