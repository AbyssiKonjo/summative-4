import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; 

import Seo from '../components/Seo';
import PageHeader from '../components/PageHeader';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const getImageUrl = (imageId) => {
  return axios
    .get(`${baseUrl}/media/${imageId}`)
    .then((response) => response.data.source_url)
    .catch(() => null);
};

const Programme = () => {
  const { id } = useParams();
  const { fontFamilyH2 } = useTheme(); 
  const [programme, setProgramme] = useState(null);
  const [loading, setLoading] = useState(true);

  const [overviewImageUrl, setOverviewImageUrl] = useState(null);
  const [detailsImageUrl, setDetailsImageUrl] = useState(null);
  const [outcomesImageUrl, setOutcomesImageUrl] = useState(null);

  const endpoint = `${baseUrl}/programmes/${id}?_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        console.log('API Response:', response.data);
        setProgramme(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    if (programme) {
      if (programme.acf?.overview_image) {
        getImageUrl(programme.acf.overview_image).then((url) => setOverviewImageUrl(url));
      }
      if (programme.acf?.details_image) {
        getImageUrl(programme.acf.details_image).then((url) => setDetailsImageUrl(url));
      }
      if (programme.acf?.outcomes_image) {
        getImageUrl(programme.acf.outcomes_image).then((url) => setOutcomesImageUrl(url));
      }
    }
  }, [programme]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Define a function to alternate the container class (left or right)
  const getPostDirectionClass = (index) => {
    return index % 2 === 0 ? 'leftPostContainer' : 'rightPostContainer';
  };

  return (
    <>
      <Seo
        title={programme.yoast_head_json?.title || `${programme.title.rendered} - The Kindness Institute`}
        description={programme.yoast_head_json?.description}
        image={programme.yoast_head_json?.og_image?.[0]?.url}
        url={window.location.href}
      />
      <PageHeader title={programme.title.rendered} image_url='/headers-bg-image/programme.jpg' />
      
      <div id='singlePageContent'>
        <div className='post-container'>
          <h2 className='title' style={{ fontFamily: fontFamilyH2 }}>Overview</h2>
          <div className={getPostDirectionClass(0)}>
            <div className='post-content'>
            {overviewImageUrl && <img src={overviewImageUrl} alt={programme.title.rendered} />}
            <div className='text-content'>
                {/* <p>{programme.acf.programme_overview}</p> */}
                <div dangerouslySetInnerHTML={{ __html: programme.acf.programme_overview }} />
              </div>
            </div>
          </div>

          <h2 className='title' style={{ fontFamily: fontFamilyH2 }}>Details</h2>
          <div className={getPostDirectionClass(1)}>
            <div className='post-content'>
            {detailsImageUrl && <img src={detailsImageUrl} alt={programme.title.rendered} />}
            <div className='text-content'>
                {/* <p>{programme.acf.programme_details}</p> */}
                <div dangerouslySetInnerHTML={{ __html: programme.acf.programme_details }} />
              </div>
            </div>
          </div>

          <h2 className='title' style={{ fontFamily: fontFamilyH2 }}>Outcomes</h2>
          <div className={getPostDirectionClass(2)}>
            <div className='post-content'>
            {outcomesImageUrl && <img src={outcomesImageUrl} alt={programme.title.rendered} />}
            <div className='text-content'>
                {/* <p>{programme.acf.programme_outcomes}</p> */}
                <div dangerouslySetInnerHTML={{ __html: programme.acf.programme_outcomes }} />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Programme;
