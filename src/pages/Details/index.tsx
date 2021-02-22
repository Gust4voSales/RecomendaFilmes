import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import EvaluationCircle from '../../components/EvaluationCircle';
import Gallery from '../../components/Gallery';
import GenreTag from '../../components/GenreTag';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import MovieDetails from '../../components/MovieDetails';
import SimilarTitles from '../../components/SimilarTitles';
import TvDetails from '../../components/TvDetails';
import tmdbAPI, { baseImgURL } from '../../services/api';
import './styles.scss';

interface DetailsParams {
  id: string;
}

// Data only used in Movies
export interface MovieDetailsData {
  id: number;
  title: string;
  runtime: number | null;
  budget: number;
  release_date: string;
  status: string;
}

// Data only used in TV
export interface TvDetailsData {
  id: number;
  name: string;
  first_air_date: string;
  episode_run_time: number[] | null;
  number_of_seasons: number;
  number_of_episodes: number;
  in_production: boolean;
  created_by: {
      id: number;
      name: string;
      profile_path: string | null;
    }[];
  networks: {
    name: string;
    id: number;
    logo_path: string | null;
  }[];
}

export interface GalleryData {
  videos: { results: {
    key: string;
    type: string;
   }[] };
}

export interface SimilarTitlesData {
  similar: {
    results: {
      title: string;
      name: string;
      id: number;
      poster_path: string | null;
    }[];
  }
}

interface DataResponse extends MovieDetailsData, TvDetailsData, GalleryData, SimilarTitlesData {
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
  const [detailsType, ] = useState(pathname.slice(1, 6));
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadDetails() {
      if (detailsType==='filme') {
        try {
          const { data } = await tmdbAPI.get(`movie/${id}`, 
            { params: { append_to_response: 'videos,similar' }
          });
          // console.log(data);
          setData(data);
          setLoading(false);
        } catch (err) {
          if (err.response?.status==404) {
            console.log('redirect to 404');
          } else {
            setError(true);
            setLoading(false);
          }
        }
      } else if (detailsType==='serie') {
        try {
          const { data } = await tmdbAPI.get(`tv/${id}`, 
            { params: { append_to_response: 'videos,similar' } 
          });
          // console.log(data);
          setData(data);
          setLoading(false);
        } catch (err) {
          if (err.response?.status==404) {
            console.log('redirect to 404');
          } else {
            setError(true);
            setLoading(false);
          }
        }
      }
      else {
        console.log('redirect to 404');
      }
    }

    // RESETING
    setLoading(true);
    setOption(0);
    setError(false);

    loadDetails();
  }, [id, detailsType]);

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
      if (detailsType==='filme')
        return <MovieDetails details={data}/>;
      return <TvDetails details={data}/>;
    } else if (option===1) {
      return <Gallery videos={data.videos} />;
    }
    return <SimilarTitles similar={data.similar} />;
  }

  if (loading) {
    return (
      <div 
        style={
          { height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0 5%' }
        }
      >
        <Header backButtonRoute="/recomendar" />
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div 
        style={
          { height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0 5%' }
        }
      >
        <Header backButtonRoute="/recomendar" />
        <ErrorMessage message={"Erro ao buscar " + detailsType} />
      </div>
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
      <Header backButtonRoute="/recomendar"/>
      
      <div className="header-info-container">
        <img 
          src={`${baseImgURL}w185${data.poster_path}`} 
          alt={data.title || data.name}
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
                  return (<GenreTag name={genre.name} id={genre.id} key={genre.id}/>)
                })
              }
            </ul>
          </div>     
        </div>
        
      </div>
      
      <div className="menu-container">
        <ul className="menu-options-container">
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