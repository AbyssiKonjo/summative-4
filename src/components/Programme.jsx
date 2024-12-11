import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; 

import Seo from '../components/Seo';
import PageHeader from '../components/PageHeader';
import TuakanaSwiper from '../components/TuakanaSwiper';

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
  const [formatImageUrl, setFormatImageUrl] = useState(null);

  const endpoint = `${baseUrl}/programmes/${id}?_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setProgramme(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    if (programme) {
      if (programme.acf?.overview_image) {
        getImageUrl(programme.acf.overview_image)
        .then((url) => setOverviewImageUrl(url));
      }
      if (programme.acf?.details_image) {
        getImageUrl(programme.acf.details_image)
        .then((url) => setDetailsImageUrl(url));
      }
      if (programme.acf?.outcomes_image) {
        getImageUrl(programme.acf.outcomes_image)
        .then((url) => setOutcomesImageUrl(url));
      }
      if (programme.acf?.format_image) {
        getImageUrl(programme.acf.format_image)
        .then((url) => setFormatImageUrl(url));
      }
    }
  }, [programme]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const getPostDirectionClass = (index) => {
    return index % 2 === 0 ? 'leftPostContainer' : 'rightPostContainer';
  };

  const isTuakanaProgramme = programme.slug === 'tuakana-programme';

  return (
    <>
      <Seo
        title={programme.yoast_head_json?.title || `${programme.title.rendered} - The Kindness Institute`}
        description={programme.yoast_head_json?.description}
        image={programme.yoast_head_json?.og_image?.[0]?.url}
        url={window.location.href}
      />
      <PageHeader title={`${programme.title.rendered} Programme`} image_url='/headers-bg-image/programme.jpg' />      
      <div id='singlePageContent'>
        <div className='post-container'>
          {/* Programme Overview */}
          <h2 className='title' style={{ fontFamily: fontFamilyH2 }}>Overview</h2>
          <div className={getPostDirectionClass(0)}>
            <div className='post-content'>
              {overviewImageUrl && <img src={overviewImageUrl} alt={programme.title.rendered} />}
              <div className='text-content'>
                <div dangerouslySetInnerHTML={{ __html: programme.acf.programme_overview }} />
              </div>
            </div>
          </div>

          {/* Programme Details */}
          <h2 className='title' style={{ fontFamily: fontFamilyH2 }}>Details</h2>
          <div className={getPostDirectionClass(1)}>
            <div className='post-content'>
              {detailsImageUrl && <img src={detailsImageUrl} alt={programme.title.rendered} />}
              <div className='text-content'>
                <div dangerouslySetInnerHTML={{ __html: programme.acf.programme_details }} />
              </div>
            </div>
          </div>

          {/* Programme Outcome */}
          <h2 className='title' style={{ fontFamily: fontFamilyH2 }}>Outcomes</h2>
          <div className={getPostDirectionClass(2)}>
            <div className='post-content'>
              {outcomesImageUrl && <img src={outcomesImageUrl} alt={programme.title.rendered} />}
              <div className='text-content'>
                <div dangerouslySetInnerHTML={{ __html: programme.acf.programme_outcomes }} />
              </div>
            </div>
          </div>
          
          {/* Programme Format */}
          {programme.acf.programme_format && (
            <>
              <h2 className='title' style={{ fontFamily: fontFamilyH2 }}>Format</h2>
              <div className={getPostDirectionClass(3)}>
                <div className='post-content'>
                  {formatImageUrl && <img src={formatImageUrl} alt={programme.title.rendered} />}
                  <div className='text-content'>
                    <div dangerouslySetInnerHTML={{ __html: programme.acf.programme_format }} />
                  </div>
                </div>
              </div>
            </>
          )}

          {isTuakanaProgramme && (
            <>
              <h2 className="title" style={{ fontFamily: fontFamilyH2 }}>Tuakana Team</h2>
              <TuakanaSwiper />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Programme;
