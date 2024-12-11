import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext'; 
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const TuakanaSwiper = () => {
  const { fontFamilyH2 } = useTheme(); 
  const [tuakanaMembers, setTuakanaMembers] = useState([]);
  const [groupSize, setGroupSize] = useState(3);

  useEffect(() => {
    const fetchTuakanaMembers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/tuakanas?_embed`);
        setTuakanaMembers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTuakanaMembers();
  }, []);

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

  // Group Tuakana members
  const groupMembers = (members, groupSize) => {
    const result = [];
    for (let i = 0; i < members.length; i += groupSize) {
      result.push(members.slice(i, i + groupSize));
    }
    return result;
  };

  const groupedTuakanaMembers = groupMembers(tuakanaMembers, groupSize);

  return (
    <>
      <div id="tuakana-swiper" className="swiper-container">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1}
        >
          {groupedTuakanaMembers.map((group, index) => (
            <SwiperSlide key={index}>
              <div className="image-container">
                {group.map((member, memberIndex) => {
                  const memberImage = member._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                  return memberImage ? (
                    <div key={memberIndex} className="member-image">
                      <img src={memberImage} alt={member.title.rendered} />
                    </div>
                  ) : null;
                })}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default TuakanaSwiper;
