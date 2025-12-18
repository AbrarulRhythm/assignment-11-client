import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import TutorCard from '../../Shared/TutorCard/TutorCard';

const LatestTutor = () => {
    const axiosInstance = useAxios();

    const { isLoading, data: latestTutor = [] } = useQuery({
        queryKey: ['latest-tutor'],
        queryFn: async () => {
            const res = await axiosInstance.get('/latest-user?role=tutor');
            return res.data
        }
    });

    return (
        <div className='container'>
            <SectionTitle
                title='Latest Tutors'
                subTitle='Recently Joined Tutors'
            ></SectionTitle>

            <div className='flex flex-wrap -mx-3'>
                {/* Loading State */}
                {isLoading ? (
                    <div className='text-center mx-auto'>
                        <span className="loading loading-bars loading-xl"></span>
                    </div>
                ) : (
                    <>
                        {/* Empty Satte */}
                        {(!latestTutor || latestTutor.length === 0) ? (
                            <div className='text-center mx-auto'>
                                <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                <span className='text-base'>No tutor available at the moment.</span>
                            </div>
                        ) : (
                            // Data Row
                            latestTutor.map(tutor => {
                                return (
                                    <TutorCard
                                        key={tutor._id}
                                        tutor={tutor}
                                    ></TutorCard>
                                )
                            })
                        )}
                    </>
                )}
            </div>

            {/* Elements */}
            <div>
                <div className='hidden lg:block absolute w-[258px] h-[258px] bg-[linear-gradient(0deg,#FE12EE,#FE12EE)] blur-[182px] rounded-full top-[40%] rotate-45 left-[-200px] -translate-y-[20%] '></div>
                <div className='hidden lg:block absolute w-[258px] h-[258px] bg-[linear-gradient(0deg,#12FE98,#12FE98)] blur-[182px] rounded-full bottom-[-200px] rotate-45 right-[-171px] -translate-y-[20%] '></div>
            </div>
        </div>
    );
};

export default LatestTutor;