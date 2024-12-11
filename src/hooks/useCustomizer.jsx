import {useState, useEffect} from 'react'
import axios from 'axios'

const useCustomizer = () => {
    const [bgColor, setBgColor] = useState('');
    const [fontFamilyH1, setFontFamilyH1] = useState('');
    const [fontFamilyH2, setFontFamilyH2] = useState('');
    const [fontFamilyH3, setFontFamilyH3] = useState('');
    const [fontFamilyBody, setFontFamilyBody] = useState('');
    const [mobileMenu, setMobileMenu] = useState('');
    const [navColor, setNavColor] = useState('');
    const [donateButtonColor, setDonateButtonColor] = useState('');
    const [donateButtonHoverColor, setDonateButtonHoverColor] = useState('');

    const baseUrl = import.meta.env.VITE_WP_BASEURL;

    useEffect(()=> {
        axios
        .get(`${baseUrl}wp-json/custom-theme/v1/customizer-settings`)
        .then((response) => {
            const { backgroundColor, fontFamilyH1, fontFamilyH2, fontFamilyH3, fontFamilyBody, mobileMenu, navbarColor, donateButtonColor, donateButtonHoverColor } = response.data;
            setBgColor (backgroundColor);
            setFontFamilyH1(fontFamilyH1);
            setFontFamilyH2(fontFamilyH2);
            setFontFamilyH3(fontFamilyH3);
            setFontFamilyBody(fontFamilyBody);            
            setMobileMenu (mobileMenu);
            setNavColor (navbarColor);
            setDonateButtonColor(donateButtonColor);
            setDonateButtonHoverColor(donateButtonHoverColor);
        })
        .catch((error) => {
            console.error('Error fetching customizer settings:', error);
        });
    }, [baseUrl]);

    return { bgColor, fontFamilyH1, fontFamilyH2, fontFamilyH3, fontFamilyBody, mobileMenu, navColor, donateButtonColor, donateButtonHoverColor };
};

export default useCustomizer
