import React, { useEffect, useState } from 'react';
import { TvDetailsData } from '../../pages/Details';
import tmdbAPI, { baseImgURL } from '../../services/api';
import timeParser from '../../utils/timeParser';
import './styles.scss';



interface TvDetailsProps {
  details: TvDetailsData;
}

interface ActorInfo {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

const TvDetails: React.FC<TvDetailsProps> = ({ details }) => {
  const [actors, setActors] = useState<ActorInfo[]>([]);

  useEffect(() => {
    async function loadCredits() {
      try {
        const { data } = await tmdbAPI.get(`/tv/${details.id}/credits`);

        setActors(data.cast.slice(0, 10)); // top 10 actors
      } catch (err) {
        console.log(err);
      }
    }

    loadCredits();
  }, [details.id]);
  
  function parseEpisodeRunTimes() {
    if (!details.episode_run_time) {
      return '';
    }

    let parsedRunTimes = details.episode_run_time.map(epTime => `${timeParser(epTime)}`);

    return parsedRunTimes.join(' / ');
  }

  return (
    <div className="details-container">
      <section className="info-top info-top-tv">
        <div className="info-box">
          <span>Duração dos episódios:</span>
          <p>{parseEpisodeRunTimes()}</p>
        </div>
        <div className="info-box">
          <span>Temporadas:</span>
          <p>{details.number_of_seasons}</p>
        </div>            
        <div className="info-box">
          <span>Em produção:</span>
          <p>{details.in_production ? 'Sim' : 'Não'}</p>
        </div>    
        <div className="info-box">
          <span>Total de episódios:</span>
          <p>{details.number_of_episodes}</p>
        </div>  
      </section>

      <section className="info-bottom">
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
        {/* <div className="info-box">
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
        </div> */}
      </section>
    </div>  
  );
}

export default TvDetails;