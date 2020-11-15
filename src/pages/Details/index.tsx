import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import tmdbAPI, { baseImgURL } from '../../services/api';
import './styles.scss';

interface DetailsParams {
  id: string;
}

interface DataResponse {
  title: string;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

const Details: React.FC = () => {
  const { id } = useParams<DetailsParams>();
  const { pathname } = useLocation();
  // const { filter } = useFilter();

  const [data, setData] = useState<DataResponse>({} as DataResponse);

  useEffect(() => {
    async function loadDetails() {
      if (pathname.slice(1, 6)==='filme') {
        try {
          const { data } = await tmdbAPI.get(`movie/${id}`);
          console.log(data);
          setData(data);
        } catch (err) {
          console.log('redirect to 404');
        }
      } else if (pathname.slice(1, 6)==='serie') {
        try {
          const { data } = await tmdbAPI.get(`tv/${id}`);
          console.log(data);
          setData(data);
        } catch (err) {
          console.log('redirect to 404');
        }
      }
      else {
        // redirect to 404
      }
    }

    loadDetails();
  }, [id, pathname]);

  return (
    <>
    <img 
      src={`${baseImgURL}w1280${data.backdrop_path}`} 
      className="background-img"
      alt="background"
    />
    <div id="details">
      <Header backButtonRoute="/recomendar" />
      
      <div className="header-info">
        <img 
          src={`${baseImgURL}w185${data.poster_path}`} 
          alt="poster"
          className="poster"
        />
        <div className="info">
          <h2>{data.name || data.title}</h2>
          <p>{data.overview}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Details;