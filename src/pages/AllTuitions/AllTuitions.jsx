import React, { useState } from 'react';
import SectionBanner from '../../components/SectionBanner/SectionBanner';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { MdInfoOutline } from 'react-icons/md';
import TuitionCard from '../Shared/TuitionCard/TuitionCard';
import { IoSearchSharp } from 'react-icons/io5';

const AllTuitions = () => {
    const axiosInstance = useAxios();
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 12;

    const { isLoading, data: responseData = { result: [], count: 0 } } = useQuery({
        queryKey: ['tuitions', searchText, currentPage],
        queryFn: async () => {
            const res = await axiosInstance.get(`/tuitions?searchText=${searchText}&skip=${currentPage * limit}&limit=${limit}&status=approved`);
            return res.data;
        },
        placeholderData: keepPreviousData,
    });
    const tuitions = responseData.result;
    const totalCount = responseData.count;

    // Total Page Count
    const numberOfPages = Math.ceil(totalCount / limit);
    const pages = [...Array(numberOfPages).keys()];

    // Pagination button handle
    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNext = () => {
        if (currentPage < numberOfPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <>
            <title>All Tuitions - eTuitionBd</title>

            <SectionBanner
                title='All Tuitions'
                currentLink='All Tuitions'
            ></SectionBanner>

            <section className='pt-10 pb-4 lg:pt-20 lg:pb-14'>
                <div className='container'>
                    <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12'>
                        <h3 className='text-xl font-semibold text-dark-07'>Total Tuitions: {totalCount}</h3>
                        <div className='relative w-full md:w-auto'>
                            <div className='flex'>
                                <div className='h-[50px] w-[50px] bg-white text-lg flex border-l border-t border-b border-dark-03 rounded-l-md items-center justify-center'>
                                    <IoSearchSharp />
                                </div>
                                <input
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                        setCurrentPage(0);
                                    }}
                                    type="text" className='w-full md:w-auto bg-white border border-dark-03 rounded-r-md py-3 pl-4 pr-5 focus:outline-0 focus:border-theme-primary h-[50px]' placeholder='Search...' />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-wrap -mx-3'>
                        {/* Loading State */}
                        {isLoading ? (
                            <div className='text-center mx-auto'>
                                <span className="loading loading-bars loading-xl"></span>
                            </div>
                        ) : (
                            <>
                                {/* Empty Satte */}
                                {(!tuitions || tuitions.length === 0) ? (
                                    <div className='text-center mx-auto'>
                                        <MdInfoOutline className='text-4xl mx-auto mb-4' />
                                        <span className='text-base'>No tuitions available at the moment.</span>
                                    </div>
                                ) : (
                                    // Data Row
                                    tuitions.map(tuition => {
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
                    </div>
                </div>

                {!(!tuitions || tuitions.length === 0) && (
                    <div className='text-center'>
                        <div className="join mt-6">
                            {/* Prev Button */}
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 0}
                                className="join-item btn">Prev</button>

                            {
                                pages.map(pageNumber => {
                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => setCurrentPage(pageNumber)}
                                            className={`join-item btn ${currentPage === pageNumber ? 'bg-theme-primary text-white' : ''}`}>
                                            {pageNumber + 1}
                                        </button>
                                    )
                                })
                            }

                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                disabled={currentPage === numberOfPages - 1}
                                className="join-item btn">Next</button>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default AllTuitions;