import { useEffect, useState } from 'react';
import axios from 'axios';
import he from 'he'
import { useTheme } from '../context/ThemeContext';

import Seo from '../components/Seo';
import PageHeader from '../components/PageHeader';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Programmes = () => {
    const { fontFamilyH2 } = useTheme();
    const [programmesPost, setProgrammesPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    const endpoint = `${baseUrl}/programmes?_embed`;

    useEffect(() => {
        axios
            .get(endpoint)
            .then((response) => {
                const reversedPosts = response.data.reverse();
                setProgrammesPosts(reversedPosts);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const truncateContent = (content) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const firstParagraph = doc.querySelector('p')?.textContent || '';
        const decodedContent = he.decode(firstParagraph);
        return decodedContent;
    };
 
    const ProgrammesPosts = ({ programmesPost }) => {
        const mappedProgrammesPosts = programmesPost.map((programmesPost, index) => {
            const featuredImage =
                programmesPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
            
            const postDirectionContainer = index % 2 === 0 ? 'leftPostContainer' : 'rightPostContainer';
    
            return (
                <div key={programmesPost.slug + "-" + index} id={postDirectionContainer} className="post-container">
                    <h2 className="title" style={{ fontFamily: fontFamilyH2 }}>{programmesPost.title.rendered}</h2>
                    <div className="post-content">
                        {featuredImage && <img src={featuredImage} alt={programmesPost.title.rendered} />}
                        <div className="text-content">
                            <p>{truncateContent(programmesPost.content.rendered)}</p>
                            <a href={`#/programme/${programmesPost.id}`} className="read-more-button">Read More</a>
                        </div>
                    </div>
                </div>
            );
        });
    
        return <>{mappedProgrammesPosts}</>;
    };

    return (
        <>
            <Seo
                title="Programmes - The Kindness Institute"
                description="Browse the custom site I created for The Kindness Institute for my final summative."
                url={window.location.href}
            />
            <PageHeader title='Programmes' image_url="/headers-bg-image/programme.jpg"/>
            <div id="pageContent">
                {loading ? <p>Loading...</p> : <ProgrammesPosts programmesPost={programmesPost} />}
            </div>
        </>
    );
};

export default Programmes;
