import React, { MouseEventHandler } from 'react';
import './styles.scss';
import { baseImgURL } from '../../services/api';
import { recommendationsResponse } from '../RecommendationsResults/index';
import EvaluationCircle from '../EvaluationCircle';
import GenresTags from './GenresTags';
import { useHistory } from 'react-router-dom';
import { useFilter } from '../../contexts/filtersContexts';

interface CardProps {
  data: recommendationsResponse;
}

const CardResult: React.FC<CardProps> = ({ data }) => {
  const maxCharsOverview = 160;
  const history = useHistory();
  const { filter } = useFilter();

  const stopClickPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    if (data.overview.length > maxCharsOverview)
      e.stopPropagation();
  }

  function navigateToDetails() {
    if (filter.option==='tv')
      history.push(`/serie/${data.id}`);
    else 
      history.push(`/filme/${data.id}`);
  }

  return (
    <li 
      className="card"
      key={data.id}
      onClick={navigateToDetails}
    >
      { data.backdrop_path 
        && <img 
            src={`${baseImgURL}w500${data.backdrop_path}`} 
            alt="background"
            className="background-img"  
          />
      }
      {data.poster_path 
        ? <img 
            src={`${baseImgURL}w154${data.poster_path}`} 
            alt={data.title}
            className="poster-img"  
          />
        : <div className="poster-img" />
      }
      <div className="info">
        <h1>{data.title || data.name}</h1>
        <div 
          className="overview" 
          onClick={stopClickPropagation} 
          style={data.overview.length>maxCharsOverview ? { cursor: 'text' } : {}} 
        >
          <p>
            {data.overview.slice(0, maxCharsOverview) || "Sem resumo"}
            {data.overview.length > maxCharsOverview && <span className="dots">...</span> }
          </p> 
          {data.overview.length > maxCharsOverview 
            && 
            <p className="dropdown-overview" >
              {data.overview}
            </p>
        }
        </div>
        <div className="bottom">
          <EvaluationCircle vote_average={data.vote_average} vote_count={data.vote_count}/>
          <GenresTags genre_ids={data.genre_ids}/>
        </div>
      </div>
    </li>
  );
}

export default CardResult;