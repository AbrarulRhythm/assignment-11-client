import React from 'react';
import aboutUs1 from '../../../assets/about-us-1.png';
import aboutUs2 from '../../../assets/about-us-2.png';
import element from '../../../assets/element1.png';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { GiCheckMark } from 'react-icons/gi';
import acheivment from '../../../assets/acheivment.png';
import students from '../../../assets/students.png';
import teachers from '../../../assets/teachers.png';
import world from '../../../assets/world.png';

const counterArea = [
    {
        id: 1,
        icon: acheivment,
        title: '9+',
        subTitle: 'Total Acheivment'
    },
    {
        id: 2,
        icon: students,
        title: '29+',
        subTitle: 'TOTAL STUDENTS'
    },
    {
        id: 3,
        icon: teachers,
        title: '2K',
        subTitle: 'TOTAL TUTORS'
    },
    {
        id: 4,
        icon: world,
        title: '64',
        subTitle: 'OVER the COUNTRY'
    }
]

const AboutUs = () => {
    return (
        <div className='container'>
            <div className='flex flex-wrap -mx-3'>
                <div className='w-full md:w-6/12 px-3 mb-8'>
                    <div className='pl-6 lg:pl-[100px] pr-0 lg:pr-5 relative'>
                        <div className='relative'>
                            <img src={element} className='absolute -top-6 -left-6' alt="element" />
                            <img src={aboutUs1} className='rounded-md lg:max-w-[382px] z-10 relative' alt="about us image" />
                            <img src={aboutUs2} className='rounded-md absolute bottom-0 right-0 z-20' alt="about us image" />
                            <div className='block lg:hidden absolute w-[258px] h-[258px] bg-[linear-gradient(0deg,#FFA2F9,#FFA2F9)] blur-[182px] rounded-full top-[50%] left-[18px] md:left-[34px] lg:left-[39%] z-10'></div>
                        </div>
                        <div className='flex items-center gap-2 border-l-4 border-theme-primary py-5 px-4 absolute left-0 bottom-0 z-30 bg-white animate-move1'>
                            <h3 className='text-[44px] font-semibold text-theme-primary'>5+</h3>
                            <h5 className='uppercase text-dark-09 text-[22px] font-semibold leading-[1.3]'>YEARS EXPERIENCE <br /> JUST ACHIVED</h5>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-6/12 px-3'>
                    <SectionTitle
                        title='About Us'
                        subTitle='Welcome to the Online Learning Center'
                        classes='text-left'
                        spacing='mb-4 lg:mb-6'
                    ></SectionTitle>
                    <p>Built to make tuition posting, tutoring, and communication simpler and more efficient for everyone.</p>
                    <ul className='mt-7 space-y-4'>
                        <li>
                            <div className='flex items-center gap-2.5'>
                                <GiCheckMark className='text-theme-primary' /> Quick Tuition Posting
                            </div>
                        </li>
                        <li>
                            <div className='flex items-center gap-2.5'>
                                <GiCheckMark className='text-theme-primary' /> Smart Tutor Matching
                            </div>
                        </li>
                        <li>
                            <div className='flex items-center gap-2.5'>
                                <GiCheckMark className='text-theme-primary' /> Instant Live Chat
                            </div>
                        </li>
                        <li>
                            <div className='flex items-center gap-2.5'>
                                <GiCheckMark className='text-theme-primary' /> Secure Payment Tracking
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Count Area */}
            <div className='count-area pt-12'>
                <div className='flex flex-wrap -mx-3'>
                    {
                        counterArea.map((item) => {
                            return (
                                <div key={item.id} className='w-full md:w-6/12 lg:w-3/12 px-3 mb-6'>
                                    <div className='flex items-center gap-4'>
                                        <img src={item.icon} alt="icon" />
                                        <div>
                                            <h3 className='text-dark-09 text-[34px] font-semibold leading-[1.2]'>{item.title}</h3>
                                            <h5 className='text-dark-09 uppercase font-semibold text-lg'>{item.subTitle}</h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


            {/* Elements */}
            <div>
                <div className='hidden lg:block absolute w-[258px] h-[258px] bg-[linear-gradient(0deg,#FFCD20,#FFCD20)] blur-[182px] rounded-full bottom-0 right-[-171px] -translate-y-[20%] '></div>
            </div>
        </div>
    );
};

export default AboutUs;