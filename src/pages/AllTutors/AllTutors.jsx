import React from 'react';
import SectionBanner from '../../components/SectionBanner/SectionBanner';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import TutorCard from '../Shared/TutorCard/TutorCard';

const AllTutors = () => {
    const axiosInstance = useAxios();

    const { isLoading, data: tutors = [] } = useQuery({
        queryKey: ['tutor'],
        queryFn: async () => {
            const res = await axiosInstance.get('/users?role=tutor');
            return res.data
        }
    });

    return (
        <>
            <title>All Tutors - eTuitionBd</title>

            <SectionBanner
                title='All Tutors'
                currentLink='All Tutors'
            ></SectionBanner>

            <section className='pt-10 pb-4 lg:pt-20 lg:pb-14'>
                <div className='container'>
                    <div className='flex flex-wrap -mx-3'>
                        {/* Loading State */}
                        {isLoading ? (
                            <div className='text-center mx-auto'>
                                <span className="loading loading-bars loading-xl"></span>
                            </div>
                        ) : (
                            <>
                                {/* Empty Satte */}
                                {(!tutors || tutors.length === 0) ? (
                                    <div className='text-center mx-auto'>
                                        <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                        <span className='text-base'>No tutor available at the moment.</span>
                                    </div>
                                ) : (
                                    // Data Row
                                    tutors.map(tutor => {
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
                </div>
            </section>
        </>
    );
};

export default AllTutors;