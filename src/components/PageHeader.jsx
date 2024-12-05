import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { useTheme } from '../context/ThemeContext';

const PageHeader = ({ title, image_url }) => {
    const { fontFamilyH1 } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackClick = (event) => {
        event.preventDefault();
        navigate(-1);
    }

    const showBackIconPath = [
        '/programme',
        '/team',
        '/board',
        '/founder',
        '/mentors',
        '/sponsors',
        '/tuakana'
    ];

    const showBackIcon = showBackIconPath.some(path => location.pathname.includes(path));

    return (
        <div className='header-section' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${image_url})` }}>
            {showBackIcon && (
                <p onClick={handleBackClick}>
                    <IoIosArrowBack/>
                </p>
            )}
            <h1 style={{ fontFamily: fontFamilyH1 }}>{title}</h1>
        </div>
    );
}

export default PageHeader;
