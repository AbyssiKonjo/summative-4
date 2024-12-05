import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import OurProgrammes from '../components/OurProgrammes';

import Seo from '../components/Seo';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Home = () => {
    const { fontFamilyH2 } = useTheme();
    const [homePosts, setHomePosts] = useState(null);
    const [loading, setLoading] = useState(true);

    const endpoint = `${baseUrl}/home?_embed`;

    useEffect(() => {
        axios
            .get(endpoint)
            .then((response) => {
                const reversedPosts = response.data.reverse();
                setHomePosts(reversedPosts);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const HomePosts = ({ homePosts }) => {
        const mappedHomePosts = homePosts.map((homePost, index) => {
            const featuredImage = homePost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    
            const postDirectionContainer = index % 2 === 0 ? 'leftPostContainer' : 'rightPostContainer';
    
            return (
                <div key={homePost.slug + "-" + index} id={postDirectionContainer} className="post-container">
                    <h2 className="title" style={{ fontFamily: fontFamilyH2 }}>{homePost.title.rendered}</h2>
                    <div className="post-content">
                        {featuredImage && <img src={featuredImage} alt={homePost.title.rendered} />}
                        <div className="text-content" dangerouslySetInnerHTML={{ __html: homePost.content.rendered }} />
                    </div>
                </div>
            );
        });
    
        return <>{mappedHomePosts}</>;
    };
    

    return (
        <>
            <Seo
                title="Home - The Kindness Institute"
                description="Browse the custom site I created for The Kindness Institute for my final summative."
                url={window.location.href}
            />
            <div className='page-header'>
                <div className='header-section' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/headers-bg-image/home.jpg')`}}>
                    <div id='homePageHeader'>
                        <h1>Te Hā, Aroha, Koha</h1>
                        <h2>- Breath, Love, Give</h2>
                    </div>
                    
                </div>
            </div>
            <div id="pageContent">
                {loading ? <p>Loading...</p> : <HomePosts homePosts={homePosts} />}
                <OurProgrammes/>
            </div>
        </>
    );
};

export default Home;
