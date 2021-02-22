import React, { MouseEventHandler, useState } from 'react';
import './styles.scss';
import { baseImgURL } from '../../services/api';
import { recommendationsResponse } from '../RecommendationsResults/index';
import EvaluationCircle from '../EvaluationCircle';
import GenresTags from './GenresTags';
import { Link, } from 'react-router-dom';
import { useFilter } from '../../contexts/filtersContexts';

interface CardProps {
  data: recommendationsResponse;
}

const CardResult: React.FC<CardProps> = ({ data }) => {
  const maxCharsOverview = 160;
  const { filter } = useFilter();

  const [hoveredOverview, setHoveredOverview] = useState(false);

  const navigateToDetails: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // If it is a hoverable overview then check if the user is currently hovering it
    // if the user isn't hovering, then the link will behave as expected
    // otherwise, it won't navigate to the new screen
    if ((data.overview.length > maxCharsOverview) && hoveredOverview) {
      e.preventDefault();
    } 
  }

  return ( 
    <Link 
      to={filter.option==='tv' ? `/serie/${data.id}` : `/filme/${data.id}`} 
      onClick={(e) => navigateToDetails(e)}
    >
    <li 
      className="card"
      key={data.id}
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
          onMouseEnter={() => setHoveredOverview(true)}
          onMouseLeave={() => setHoveredOverview(false)}
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
    </Link>
  );
}

export default CardResult;