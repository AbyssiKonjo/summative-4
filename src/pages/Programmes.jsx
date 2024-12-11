import { useEffect, useState } from 'react';
import axios from 'axios';
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
 
    const ProgrammesPosts = ({ programmesPost }) => {
        const mappedProgrammesPosts = programmesPost.map((programmesPost, index) => {
            const overviewImageId = programmesPost.acf?.overview_image || null;

            const [overviewImageUrl, setOverviewImageUrl] = useState(null);

            useEffect(() => {
                if (overviewImageId) {
                    getImageUrl(overviewImageId).then(url => setOverviewImageUrl(url));
                }
            }, [overviewImageId]);
    
            const postDirectionContainer = index % 2 === 0 ? 'leftPostContainer' : 'rightPostContainer';
    
            return (
                <div key={programmesPost.slug + "-" + index} id={postDirectionContainer} className="post-container">
                    <h2 className="title" style={{ fontFamily: fontFamilyH2 }}>{programmesPost.title.rendered}</h2>
                    <div className="post-content">
                        {overviewImageUrl && <img src={overviewImageUrl} alt={programmesPost.title.rendered} />}
                        <div className="text-content">
                            <div dangerouslySetInnerHTML={{ __html: programmesPost.acf.programme_overview }} />
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
