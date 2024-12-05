import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

import Seo from '../components/Seo';
import PageHeader from '../components/PageHeader';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const About = () => {
    const { fontFamilyH2 } = useTheme();
    const [aboutPosts, setAboutPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const endpoint = `${baseUrl}/about?_embed`;

    useEffect(() => {
        axios
            .get(endpoint)
            .then((response) => {
                const reversedPosts = response.data.reverse();
                setAboutPosts(reversedPosts);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const AboutPosts = ({ aboutPosts }) => {
        const mappedAboutPosts = aboutPosts.map((aboutPost, index) => {
            const featuredImage = aboutPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

            const postDirectionContainer = index % 2 === 0 ? 'leftPostContainer' : 'rightPostContainer';

            return (
                <div key={aboutPost.slug + "-" + index} id={postDirectionContainer} className="post-container">
                    <h2 className="title" style={{ fontFamily: fontFamilyH2 }}>{aboutPost.title.rendered}</h2>
                    <div className="post-content">
                        {featuredImage && <img src={featuredImage} alt={aboutPost.title.rendered} />}
                        <div className='text-content' dangerouslySetInnerHTML={{ __html: aboutPost.content.rendered }} />
                    </div>
                </div>
            );
        });

        return <>{mappedAboutPosts}</>;
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <Seo
                title="About - The Kindness Institute"
                description="Browse the custom site I created for The Kindness Institute for my final summative."
                url={window.location.href}
            />
            <PageHeader title="About Us" image_url="/headers-bg-image/about.jpg"/>
            <div className='info-buttons'>
                <button onClick={() => handleNavigation('/team')}>Our Rōpu/Team</button>
                <button onClick={() => handleNavigation('/board')}>Our Board</button>
                <button onClick={() => handleNavigation('/founder')}>Our Founder</button>
                <button onClick={() => handleNavigation('/sponsors')}>Our Sponsors</button>
                <button onClick={() => handleNavigation('/mentors')}>Youth Mentors</button>
                <button onClick={() => handleNavigation('/tuakana')}>Tuakanas</button>
            </div>
            <div id="pageContent">
                {loading ? <p>Loading...</p> : <AboutPosts aboutPosts={aboutPosts} />}
            </div>
        </>
    );
};

export default About;
