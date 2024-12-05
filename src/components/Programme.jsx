import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useTheme } from '../context/ThemeContext'; // Assuming the ThemeContext is the same for styling

import Seo from '../components/Seo';
import PageHeader from '../components/PageHeader';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Programme = () => {
  const { id } = useParams();
  const { fontFamilyH2 } = useTheme(); // Assuming you want to apply theme-based styles
  const [programme, setProgramme] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const extractImage = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const image = doc.querySelector('img');
    return image ? image.src : 'https://via.placeholder.com/150';
  };

  const fullContent = DOMPurify.sanitize(programme?.content.rendered || '');
  const imageUrl = extractImage(fullContent);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Seo
        title={programme.yoast_head_json?.title || `${programme.title.rendered} - MyFirstWp`}
        description={programme.yoast_head_json?.description}
        image={programme.yoast_head_json?.og_image?.[0]?.url}
        url={window.location.href}
      />
      <PageHeader title={programme.title.rendered} image_url='/headers-bg-image/programme.jpg' />
      
      <div id="pageContent" className="post-container">
        <h2 className="title" style={{ fontFamily: fontFamilyH2 }}>{programme.title.rendered}</h2>
            <div className='programme-post-content' dangerouslySetInnerHTML={{ __html: fullContent }} />
      </div>
    </>
  );
};

export default Programme;
