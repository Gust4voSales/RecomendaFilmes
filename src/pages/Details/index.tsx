import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import EvaluationCircle from '../../components/EvaluationCircle';
import GenreTag from '../../components/GenreTag';
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
  genres: {
    id: number;
    name: string;
  }[];
  vote_average: number;
  vote_count: number;
}

const Details: React.FC = () => {
  const { id } = useParams<DetailsParams>();
  const { pathname } = useLocation();
  // const { filter } = useFilter();

  const [data, setData] = useState<DataResponse>({} as DataResponse);
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState(0);

  useEffect(() => {
    async function loadDetails() {
      if (pathname.slice(1, 6)==='filme') {
        try {
          const { data } = await tmdbAPI.get(`movie/${id}`);
          console.log(data);
          setData(data);
          setLoading(false);
        } catch (err) {
          console.log('redirect to 404');
        }
      } else if (pathname.slice(1, 6)==='serie') {
        try {
          const { data } = await tmdbAPI.get(`tv/${id}`);
          console.log(data);
          setData(data);
          setLoading(false);
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

  function handleSelectOption(option: number) {
    if (option===0) {
      setOption(0);
    } else if (option===1) {
      setOption(1);
    } else {
      setOption(2);
    }
  }

  function renderContentBasedOnOption() {
    if (option===0) {
      return (<h5>DETALHES</h5>);
    } else if (option===1) {
      return (<h5>GALERIA</h5>);
    }
    return (<h5>VER SIMILARES</h5>);
  }

  if (loading) {
    return (
      <h1>LOADING</h1>
    );
  }

  return (
    <>
    {data.backdrop_path && 
    <img 
      // src={`${baseImgURL}w1280${data.backdrop_path}`} 
      src={`${baseImgURL}original${data.backdrop_path}`} 
      className="background-img"
      alt="background"
    />
    }
    
    <div id="details">
      <Header backButtonRoute="/recomendar" />
      
      <div className="header-info-container">
        <img 
          src={`${baseImgURL}w185${data.poster_path}`} 
          alt="poster"
          className="poster"
        />
        <div className="info">
          <h2>{data.name || data.title}</h2>
          <p>{data.overview}</p>    

          <div className="info-bottom">
            <EvaluationCircle vote_average={data.vote_average} vote_count={data.vote_count} />
            <ul className="genres-list">
              {
                data.genres.map(genre => {
                  return (<GenreTag name={genre.name} id={genre.id} />)
                })
              }
            </ul>
          </div>     
        </div>
        
      </div>
      
      <div className="menu-container">
        <ul className="menu-options-container">
          {/* 
            0 - DETAILS
            1 - GALLERY
            2 - SIMILAR TITLES
          */}
          <li onClick={() => handleSelectOption(0)} className={option===0 ? 'selected' : ''}>
            DETALHES
          </li>
          <li onClick={() => handleSelectOption(1)} className={option===1 ? 'selected' : ''}>
            GALERIA
          </li>
          <li onClick={() => handleSelectOption(2)} className={option===2 ? 'selected' : ''}>
            VER SIMILARES
          </li>
        </ul>
      
        <>
          {renderContentBasedOnOption()}
        </>
      </div>
    </div>
    </>
  );
}

export default Details;