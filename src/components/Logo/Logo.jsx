import React from 'react';
import { Link } from 'react-router';
import logoIcon from '../../assets/logo-icon.png';

const Logo = ({ color = 'text-dark-08' }) => {
    return (
        <Link to='/' className='flex items-center gap-2 hover:opacity-65 duration-300' title='eTuitionBd'>
            <img src={logoIcon} alt='Logo' />
            <div>
                <h4 className={`${color} text-[23px] font-bold`}><span className='text-theme-primary'>e</span>TuitionBd</h4>
                <span className='text-[10px] -mt-1 block'>Education Simplified</span>
            </div>
        </Link>
    );
};

export default Logo;