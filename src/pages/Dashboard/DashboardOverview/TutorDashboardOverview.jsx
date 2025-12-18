import React from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import approvedTutions from '../../../assets/approved-tutions.png';
import pendingTutions from '../../../assets/pending-tutions.png';
import closedTutions from '../../../assets/closed-tutions.png';
import rejectedTutions from '../../../assets/rejected-tutions.png';

const TutorDashboardOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: applicationStatus } = useQuery({
        queryKey: ['application_status'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutor-request/status?email=${user.email}`);
            return res.data
        }
    });

    const statusOrder = ['approved', 'pending', 'closed', 'rejected'];

    const sortedStatus = applicationStatus?.sort((a, b) => {
        return statusOrder.indexOf(a._id) - statusOrder.indexOf(b._id);
    });

    return (
        <div className='dashboard'>
            <title>Dashboard - eTuitionBd</title>

            <DashboardTitle
                title='Dashboard'
            ></DashboardTitle>

            {/* Tutions Ststus */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {/* bg-linear-to-br from-green-100 to-green-200 */}
                {isLoading ? (
                    <div className='text-center'>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : (
                    sortedStatus?.map(status => {
                        return (
                            <div key={status._id} className='w-full md:w-auto bg-white border border-dark-03 rounded-2xl p-5 flex items-start gap-3'>
                                <div className={`w-13 h-13 rounded-full border p-2.5 ${status.status === 'approved' ? 'bg-green-300 border-green-400' : status.status === 'pending' ? 'bg-amber-300 border-amber-400' : status.status === 'closed' ? 'bg-violet-300 border-violet-400' : 'bg-red-300 border-red-400'}`}>
                                    <img src={status.status === 'approved' ? approvedTutions : status.status === 'pending' ? pendingTutions : status.status === 'closed' ? closedTutions : rejectedTutions} alt="ststus icvon" />
                                </div>
                                <div>
                                    <span className='text-[12px] block mb-0.5'>{status.status.charAt(0).toUpperCase() + status.status.slice(1)} Tutions</span>
                                    <h2 className='text-dark-09 font-semibold text-[28px]'>{status.count < 10 ? `0${status.count}` : status.count}</h2>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
};

export default TutorDashboardOverview;