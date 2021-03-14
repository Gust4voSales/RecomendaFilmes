import React from 'react';
import { GalleryData } from '../../pages/Details';

import './styles.scss';

const Gallery: React.FC<GalleryData> = ({ videos }) => {
  return (
    <section className="gallery-container">
      {videos.results.length>0 
      ? <ul>
        {
          videos.results.map(video => (
            <li className="video-container" key={video.key}>
              <span>{video.type}</span>            
              <iframe 
                width="420" 
                height="315" 
                title={video.type} 
                src={`https://www.youtube.com/embed/${video.key}`} 
						    allowFullScreen
              />
            </li>
          ))
        }
        </ul>
        : <span>Nenhum vídeo disponível</span>
      }
    </section>
  );
}

export default Gallery;