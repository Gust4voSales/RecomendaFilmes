import React, { useEffect, useState } from 'react';
import { MovieDetailsData } from '../../pages/Details';
import tmdbAPI, { baseImgURL } from '../../services/api';
import timeParser from '../../utils/timeParser';
import './styles.scss';

interface MovieDetailsProps {
  details: MovieDetailsData;
}

interface ActorInfo {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

interface DirectorInfo {
  id: number;
  name: string;
  profile_path: string | null;
  job: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ details }) => {
  const [actors, setActors] = useState<ActorInfo[]>([]);
  const [directors, setDirectors] = useState<DirectorInfo[]>([]);

  useEffect(() => {
    async function loadCredits() {
      try {
        const { data } = await tmdbAPI.get(`/movie/${details.id}/credits`);

        let movieDirectors = [];
        for (let crewMember of data.crew) {
          if (crewMember.job==="Director") {
            movieDirectors.push(crewMember);
          }
        }

        setDirectors(movieDirectors);
        setActors(data.cast.slice(0, 10)); // top 10 actors

      } catch (err) {
        console.log(err);
      }
    }

    loadCredits();
  }, [details.id]);
  
  function parseData() {
    const stringDataUS = details.release_date;

    const parsedData = `${stringDataUS.slice(8, 10)}/${stringDataUS.slice(5, 7)}/${stringDataUS.slice(0, 4)}`
    
    return parsedData;
  }
  
  function translateStatus() {
    const status = details.status;
    if (status==='Rumored') {
      return 'Rumor';
    } else if (status==='Planned') {
      return 'Planejado';
    } else if (status==='In Production') {
      return 'Em produção';
    } else if (status==='Post Production') {
      return 'Pós produção';
    } else if (status==='Released') {
      return 'Lançado';
    } else if (status==='Canceled') {
      return 'Cancelado';
    } 
    return '';
  }

  function parseRuntime() {
    if (!details.runtime) {
      return '';
    }

    return timeParser(details.runtime);
  }

  return (
    <div className="details-container">
      <section className="left">
        <div className="info-box">
          <span>Duração:</span>
          <p>{parseRuntime()}</p>
        </div>
        <div className="info-box">
          <span>Data de lançamento:</span>
          <p>{parseData()}</p>
        </div>
        <div className="info-box">
          <span>Status:</span>
          <p>{translateStatus()}</p>
        </div>
        <div className="info-box">
          <span>Orçamento:</span>
          <p>
            {new Intl.NumberFormat('us', 
              { style: 'currency', currency: 'USD'}).format(details.budget)
            }
          </p>
        </div>
      </section>

      <section className="center">
        <div className="info-box">
          <span>Elenco:</span>
          <ul>
            {actors.map(actor => (
              <li key={actor.id}>
                {actor.profile_path 
                  ? <img src={`${baseImgURL}w185${actor.profile_path}`} alt="Ator"/>
                  : <div className="img-placeholder"/>
                }
                <p>{actor.name}</p>
              </li>    
            ))}
          </ul>
        </div>
      </section>

      <section className="right">
        <div className="info-box">
          <span>Direção:</span>
          <ul>
            {directors.map(director => (
              <li key={director.id}>
                {director.profile_path 
                  ? <img src={`${baseImgURL}w185${director.profile_path}`} alt="Diretor"/>
                  : <div className="img-placeholder"/>
                }
                <p>{director.name}</p>
              </li>    
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default MovieDetails;