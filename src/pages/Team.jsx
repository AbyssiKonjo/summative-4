import { useEffect, useState } from 'react';
import axios from 'axios';
import he from 'he'
import { useTheme } from '../context/ThemeContext';

import Seo from '../components/Seo';
import PageHeader from '../components/PageHeader';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Team = () => {
    const { fontFamilyH3 } = useTheme();
    const [teamPosts, setTeamPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    const endpoint = `${baseUrl}/team?_embed`;

    useEffect(() => {
        axios
            .get(endpoint)
            .then((response) => {
                const reversedPosts = response.data.reverse();
                setTeamPosts(reversedPosts);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const truncateContent = (content) => {
        const decodedContent = he.decode(content);
        const textOnly = decodedContent.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ").trim();
        const firstSentence = textOnly.split(/(?<=[.!?])\s+/)[0];
        return firstSentence + (textOnly.length > firstSentence.length ? "." : "");
      };

    const TeamPosts = ({ teamPosts }) => {
        const mappedTeamPosts = teamPosts.map((teamPost, index) => {
            const featuredImage = teamPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
            
            const postDirectionContainer = index % 2 === 0 ? 'leftPostContainer' : 'rightPostContainer';

            return (
                <div key={teamPost.slug + "-" + index} id={postDirectionContainer} className="post-container">
                    <div className="post-content">
                        {featuredImage && <img src={featuredImage} alt={teamPost.title.rendered} />}
                        <div className='text-content'>
                        <h3 className="title" style={{ fontFamily: fontFamilyH3 }}>{truncateContent(he.decode(teamPost.title.rendered))}</h3>
                            <div dangerouslySetInnerHTML={{ __html: teamPost.content.rendered }} />
                        </div>
                        
                    </div>
                </div>
            );
        });

        return <>{mappedTeamPosts}</>;
    };

    return (
        <>
            <Seo
                title="Home - The Kindness Institute"
                description="Browse the custom site I created for The Kindness Institute for my final summative."
                url={window.location.href}
            />
            <PageHeader title='Our Team' image_url="/headers-bg-image/about.jpg"/>
            <div id="pageContent">
                {loading ? <p>Loading...</p> : <TeamPosts teamPosts={teamPosts} />}
            </div>
        </>
    );
};

export default Team;
