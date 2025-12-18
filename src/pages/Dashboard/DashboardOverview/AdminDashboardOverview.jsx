import React from 'react';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';
import approvedTutions from '../../../assets/approved-tutions.png';
import pendingTutions from '../../../assets/pending-tutions.png';
import closedTutions from '../../../assets/closed-tutions.png';
import rejectedTutions from '../../../assets/rejected-tutions.png';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import student from '../../../assets/students.png';
import teacher from '../../../assets/teachers.png';
import creditCard from '../../../assets/credit-card.png';
import profit from '../../../assets/profit.png';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

const AdminDashboardOverview = () => {
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: tutionStatus } = useQuery({
        queryKey: ['tution-status'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tuitions/status');
            return res.data;
        }
    });

    const { isLoading: userLoading, data: userData } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/role');
            return res.data;
        }
    });

    const { isLoading: totalAmountLoading, data: totalAmountData } = useQuery({
        queryKey: ['total_amount'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments/total');
            return res.data;
        }
    });

    const { isLoading: paymentChartLoading, data: paymentChartData } = useQuery({
        queryKey: ['payment_chart'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments/chart-data');
            return res.data;
        }
    });


    const chartData = paymentChartData?.map(item => {
        const date = new Date(item.name);
        return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),

            fullDate: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            amount: item.amount
        };
    });

    const statusOrder = ['approved', 'pending', 'closed', 'rejected'];
    const userOrder = ['tutor', 'student'];

    const sortedStatus = tutionStatus?.sort((a, b) => {
        return statusOrder.indexOf(a._id) - statusOrder.indexOf(b._id);
    });

    const userOrderSet = userData?.sort((a, b) => {
        return userOrder.indexOf(a._id) - userOrder.indexOf(b._id);
    });

    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

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

            <div className='mt-12'>
                <div className='flex flex-wrap -mx-3'>
                    <div className='w-full md:w-12/12 lg:w-8/12 px-3 mb-6 lg:mb-0'>
                        {paymentChartLoading ? (
                            <div className='text-center mx-auto'>
                                <span className="loading loading-bars loading-lg"></span>
                            </div>
                        ) : (
                            <div className='bg-white p-4 rounded-2xl border border-dark-03'>
                                <AreaChart
                                    style={{ width: '100%', maxWidth: '100%', maxHeight: '40vh', aspectRatio: 1.618 }}
                                    responsive
                                    data={chartData}
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="day"
                                        tick={{ fill: '#666' }}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fill: '#666' }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className='bg-white px-4 py-2.5 rounded-md border border-dark-03'>
                                                        <p className='m-0'>{payload[0].payload.fullDate}</p>
                                                        <hr className='border-dark-03 border-dashed my-1' />
                                                        <p className='text-theme-primary'>
                                                            Amount: ${payload[0].value}
                                                        </p>
                                                        {payload[0].payload.fullDate === today && (
                                                            <p className='m-0 text-[12px] text-green-600'>(Today)</p>
                                                        )}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Area type="monotone" dataKey="amount" fillOpacity={0.2} strokeWidth={3} stroke="#00A3FF" fill="#00A3FF" />
                                </AreaChart>
                            </div>
                        )}
                    </div>
                    <div className='w-full md:w-12/12 lg:w-4/12 px-3'>
                        <div className='flex flex-wrap -mx-3'>
                            {userLoading ? (
                                <div className='text-center mx-auto'>
                                    <span className="loading loading-bars loading-lg"></span>
                                </div>
                            ) : (
                                <>
                                    {
                                        userOrderSet?.map(user => {
                                            return (
                                                <div key={user._id} className='w-6/12 px-3 mb-6'>
                                                    <div className='relative p-6 rounded-2xl bg-white border border-dark-03'>
                                                        <img src={user.role === 'tutor' ? teacher : student} className='w-10 h-10 opacity-30 absolute top-2.5 left-2.5' alt="icon" />
                                                        <span className='font-medium block mt-9 mb-1'>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                                                        <h4 className='text-center text-dark-09 text-4xl font-semibold'>{user.count < 10 ? `0${user.count}` : user.count}</h4>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    {totalAmountLoading ? (
                                        <div className='text-center mx-auto'>
                                            <span className="loading loading-bars loading-lg"></span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className='w-6/12 px-3'>
                                                <div className='relative p-6 rounded-2xl bg-white border border-dark-03'>
                                                    <img src={profit} className='w-10 h-10 opacity-30 absolute top-2.5 left-2.5' alt="icon" />
                                                    <span className='font-medium block mt-9 mb-1'>Total Earning</span>
                                                    <h4 className='text-center text-dark-09 text-2xl md:text-lg lg:text-lg 2xl:text-2xl font-semibold'>${totalAmountData.totalEarning}</h4>
                                                </div>
                                            </div>
                                            <div className='w-6/12 px-3'>
                                                <div className='relative p-6 rounded-2xl bg-white border border-dark-03'>
                                                    <img src={creditCard} className='w-10 h-10 opacity-30 absolute top-2.5 left-2.5' alt="icon" />
                                                    <span className='font-medium block mt-9 mb-1'>Total Payment</span>
                                                    <h4 className='text-center text-dark-09 text-2xl font-semibold'>{totalAmountData.totalOrders < 10 ? `0${totalAmountData.totalOrders}` : totalAmountData.totalOrders}</h4>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardOverview;