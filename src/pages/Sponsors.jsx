import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

import Seo from '../components/Seo';
import PageHeader from '../components/PageHeader';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Sponsors = () => {    
    const { fontFamilyH2 } = useTheme();
    const [boardPosts, setTeamPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    const endpoint = `${baseUrl}/sponsors?_embed`;

    useEffect(() => {
        axios
            .get(endpoint)
            .then((response) => {
                console.log(response);
                const reversedPosts = response.data.reverse();
                setTeamPosts(reversedPosts);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const BoardPosts = ({ boardPosts }) => {
        const mappedBoardPosts = boardPosts.map((boardPost, index) => {
            const featuredImage = boardPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

            return (
                <div key={boardPost.slug + "-" + index} id="sponsorContainer" className="sponsor-container">
                    <div className="post-content">
                        {/* {featuredImage && <img src={featuredImage} alt={boardPost.title.rendered} />} */}
                        <h2 className="title" style={{ fontFamily: fontFamilyH2 }}>{boardPost.title.rendered}</h2>
                        <div className='text-content'>
                            <div id='sponsorImage' dangerouslySetInnerHTML={{ __html: boardPost.content.rendered }} />
                        </div>
                        
                    </div>
                </div>
            );
        });

        return <>{mappedBoardPosts}</>;
    };

    return (
        <>
            <Seo
                title="Home - The Kindness Institute"
                description="Browse the custom site I created for The Kindness Institute for my final summative."
                url={window.location.href}
            />
            <PageHeader title='Our Sponsors' image_url="/headers-bg-image/about.jpg"/>
            <div id="pageContent">
                {loading ? <p>Loading...</p> : <BoardPosts boardPosts={boardPosts} />}
            </div>
        </>
    );
};

export default Sponsors;
