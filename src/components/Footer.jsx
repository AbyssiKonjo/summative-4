import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { IoLogoFacebook } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Footer = () => {
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        const fetchNavLogo = async () => {
            try {
                const response = await axios.get(`${baseUrl}wp-json/custom/v1/nav-logo`);
                if (response.status === 200) {
                    const data = response.data;
                    setLogoUrl(data[0]);
                } else {
                    console.error('Failed to fetch logo URL');
                }
            } catch (error) {
                console.error('Error fetching logo', error);                
            }
        };

        fetchNavLogo();
    }, []);

    return (
        <footer>
            <NavLink to='/' className='logo'>
                <img src={logoUrl} alt='Website Logo'/>
            </NavLink>
            <div id='contactDetails'>
                <h4>Contact</h4>
                <p>kiaora@thekindnessinstitute.com</p>
                <NavLink to='/contact'>Contact Form</NavLink>
            </div>
            <div id='ServiceNumber'>
                <h4>Charities Services Number</h4>
                <p>CC53279</p>
            </div>

            <div id='socialMediaIcon'>
                <a href='https://www.facebook.com/thekindnessinstitute/' target='_blank' rel='noopener noreferrer'>
                    <IoLogoFacebook />
                </a>
                <a href='https://www.instagram.com/thekindnessinstitute/' target='_blank' rel='noopener noreferrer'>
                    <AiFillInstagram />
                </a>
                <a href='https://www.youtube.com/channel/UCrmmIPSfQSzLuuXupZj4S2w' target='_blank' rel='noopener noreferrer'>
                    <AiFillYoutube />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
