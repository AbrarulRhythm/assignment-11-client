import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import { MdInfoOutline } from 'react-icons/md';
import TuitionCard from '../../Shared/TuitionCard/TuitionCard';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const LatestTuition = () => {
    const axiosInstance = useAxios();

    const { isLoading, data: latestTuitions = [] } = useQuery({
        queryKey: ['tuitions'],
        queryFn: async () => {
            const res = await axiosInstance.get('/latest-tuitions?status=approved');
            return res.data;
        }
    });

    return (
        <div className='container'>
            <motion.div
                initial={{ opacity: 0, y: 140 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <SectionTitle
                    title='Latest Tuition'
                    subTitle='Explore Recent Tuitions'
                ></SectionTitle>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 140 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className='flex flex-wrap -mx-3'>
                {/* Loading State */}
                {isLoading ? (
                    <div className='text-center mx-auto'>
                        <span className="loading loading-bars loading-xl"></span>
                    </div>
                ) : (
                    <>
                        {/* Empty Satte */}
                        {(!latestTuitions || latestTuitions.length === 0) ? (
                            <div className='text-center mx-auto'>
                                <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                <span className='text-base'>No tuitions available at the moment.</span>
                            </div>
                        ) : (
                            // Data Row
                            latestTuitions.map(tuition => {
                                return (
                                    <TuitionCard
                                        key={tuition._id}
                                        tuition={tuition}
                                    ></TuitionCard>
                                )
                            })
                        )}
                    </>
                )}
            </motion.div>
        </div >
    );
};

export default LatestTuition;