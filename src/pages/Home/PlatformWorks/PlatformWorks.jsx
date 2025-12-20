import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import audit from '../../../assets/audit.png';
import lightbulb from '../../../assets/lightbulb.png';
import advancement from '../../../assets/advancement.png';

const data = [
    {
        id: 1,
        title: 'Diagnostic Audit',
        desc: 'Start with a personalized assessment to identify strengths and bridge any learning gaps in your core subjects.',
        icon: audit,
        keyWord: 'audit'
    },
    {
        id: 2,
        title: 'Guided Study',
        desc: 'Work through tailored lesson plans with certified educators who adapt to your specific learning style.',
        icon: lightbulb,
        keyWord: 'lightbulb'
    },
    {
        id: 3,
        title: 'Proven Growth',
        desc: 'Track your progress through real-time analytics and see your grades improve with every milestone.',
        icon: advancement,
        keyWord: 'advancement'
    }
]

const PlatformWorks = () => {
    return (
        <div className='container'>
            <SectionTitle
                title='Student Journey'
                subTitle='The Mastery Approach'
            ></SectionTitle>

            <div className='flex flex-wrap -mx-3 justify-center text-center'>
                {
                    data.map(item => {
                        return (
                            <div key={item.id} className='w-full md:w-6/12 lg:w-4/12 px-3 flex flex-col items-center justify-center mb-6'>
                                <div className={`w-[115px] h-[115px] rounded-md flex items-center justify-center mb-6 ${item.keyWord === 'audit' ? 'bg-[#F3D9FF]' : item.keyWord === 'lightbulb' ? 'bg-[#FFE6BF]' : 'bg-[#CCFFE9]'}`}>
                                    <img src={item.icon} alt='icon' />
                                </div>
                                <h2 className='text-2xl font-semibold text-dark-09 mb-3'>{item.title}</h2>
                                <p>{item.desc}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PlatformWorks;