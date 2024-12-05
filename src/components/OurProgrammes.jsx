import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const OurProgrammes = () => {
    const { fontFamilyH2 } = useTheme();

    return (
        <>
            <h2>Programmes</h2>
            <div className='available-programmes'>
                <p>Click to check out information on our core youth development programs.</p>
                <div className='programme-wrapper'>
                    <Link to='/programme/atawhai' className='box1'>
                        <div id='box'>
                            <h2 style={{ fontFamily: fontFamilyH2 }}>ATAWHAI</h2>
                        </div>
                    </Link>
                    <Link to='/programme/tuakana' className='box2'>
                        <div id='box'>
                            <h2 style={{ fontFamily: fontFamilyH2 }}>TUAKANA</h2>
                        </div>
                    </Link>
                    <Link to='/programme/mauri-tau' className='box3'>
                        <div id='box'>
                            <h2 style={{ fontFamily: fontFamilyH2 }}>MAURI TAU</h2>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default OurProgrammes;
