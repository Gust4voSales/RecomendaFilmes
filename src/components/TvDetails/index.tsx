import React, { useEffect, useState } from 'react';
import { TvDetailsData } from '../../pages/Details';
import tmdbAPI from '../../services/api';
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
      {/* {actors.map(actor => (<p>{actor.name}</p>))} */}
      <div className="info-box">
        <span>Duração:</span>
        <p>{parseEpisodeRunTimes()}</p>
      </div>
    </div>  
  );
}

export default TvDetails;