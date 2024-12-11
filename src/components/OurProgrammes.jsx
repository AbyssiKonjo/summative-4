import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const OurProgrammes = () => {
    const { fontFamilyH2 } = useTheme();
    const [programmesPost, setProgrammesPosts] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [loading, setLoading] = useState(true);
    const [groupSize, setGroupSize] = useState(3);

    const endpoint = `${baseUrl}/programmes?_embed`;

    useEffect(() => {
        axios
            .get(endpoint)
            .then((response) => {
                const sortedPosts = response.data.sort((a, b) => {
                    const titleA = a.title.rendered.toLowerCase();
                    const titleB = b.title.rendered.toLowerCase();
                    if (titleA < titleB) return -1;
                    if (titleA > titleB) return 1;
                    return 0;
                });
                setProgrammesPosts(sortedPosts);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const getImageUrl = (imageId) => {
        return axios
        .get(`${baseUrl}/media/${imageId}`)
        .then(response => response.data.source_url)
        .catch(() => null);
    };

    useEffect(() => {
        programmesPost.forEach((programmesPost) => {
        const overviewImageId = programmesPost.acf?.overview_image;
        if (overviewImageId && !imageUrls[programmesPost.id]) {
            getImageUrl(overviewImageId).then((url) => {
            setImageUrls((prevUrls) => ({
                ...prevUrls,
                [programmesPost.id]: url,
            }));
            });
        }
        });
    }, [programmesPost, imageUrls]);

    // Tablet & Mobile sizes for swiper
    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth <= 600) {
            setGroupSize(1);
        } else if (window.innerWidth <= 800) {
            setGroupSize(2);
        } else {
            setGroupSize(3);
        }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <h2>Programmes</h2>
            <div className='available-programmes'>
                <p>Click to check out information on our core youth development programs.</p>
                <div className='swiper-container'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true }}
                    slidesPerView={groupSize}
                    >
                    {programmesPost.map((programmesPost) => {
                        const overviewImageUrl = imageUrls[programmesPost.id];

                        return (
                        <SwiperSlide key={programmesPost.id}>
                            <Link 
                            to={`/programme/${programmesPost.id}`} 
                            className={`box${programmesPost.id}`} 
                            >
                            <div id='box' style={{ backgroundImage: `url(${overviewImageUrl})` }}>
                                <h2 id='programmesSwiperHeading' style={{ fontFamily: fontFamilyH2 }}>
                                {programmesPost.title.rendered}
                                </h2>
                            </div>
                            </Link>
                        </SwiperSlide>
                        );
                    })}
                    </Swiper>
                )}
                </div>
            </div>
        </>
    );
};

export default OurProgrammes;
