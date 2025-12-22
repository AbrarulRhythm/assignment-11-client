import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import icon01 from '../../../assets/icon01.png';
import icon02 from '../../../assets/icon02.png';
import icon03 from '../../../assets/icon03.png';
import { motion } from 'framer-motion';

const whyChooseUsContent = [
    {
        id: 1,
        icon: icon01,
        title: 'Expert Guidance',
        desc: 'We help you grow with reliable support.'
    },
    {
        id: 2,
        icon: icon02,
        title: 'Quality Service',
        desc: 'Our team ensures consistent every time.'
    },
    {
        id: 3,
        icon: icon03,
        title: 'Trusted Experience',
        desc: 'Clients trust us for long-term success.'
    },
]

const WhyChooseUs = () => {
    return (
        <div className='container'>
            <div className='flex flex-wrap -mx-3 lg:-mx-6'>
                <div className='w-full lg:w-4/12 px-3 lg:px-6'>
                    <motion.div
                        initial={{ opacity: 0, x: -140 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className='why-choose-us-bg bg-[url(/image-05.png)] bg-cover bg-no-repeat bg-center min-h-[400px] md:min-h-[450px] lg:min-h-[560px] relative'></motion.div>
                </div>
                <div className='w-full lg:w-8/12 px-3 lg:px-6'>
                    <div className='relative w-auto pt-8 lg:pt-[190px] pb-0 lg:pb-10'>
                        <motion.div
                            initial={{ opacity: 0, y: 140 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <SectionTitle
                                title='Why Choose Us'
                                subTitle='What Makes Us Different'
                                classes='text-center md:text-left'
                                spacing='mb-6 lg:mb-7'
                            ></SectionTitle>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 140 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className='flex flex-wrap -mx-3'>
                            {
                                whyChooseUsContent.map(item => {
                                    return (
                                        <div key={item.id} className='w-full md:w-4/12 px-3 mb-6 text-center md:text-left'>
                                            <img src={item.icon} className='mb-3 mx-auto md:mx-0' alt="icon" />
                                            <h3 className='text-dark-09 font-semibold text-lg mb-1'>{item.title}</h3>
                                            <p className='lg:max-w-[250px]'>{item.desc}</p>
                                        </div>
                                    )
                                })
                            }
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;