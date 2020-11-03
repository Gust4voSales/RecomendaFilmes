import Axios from 'axios';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useFilter } from '../../contexts/filtersContexts';
import tmdbAPI, { baseImgURL } from '../../services/api';
import EvaluationCircle from '../EvaluationCircle';
import GenresTags from '../GenresTags';
import './styles.scss';

const CancelToken = Axios.CancelToken;
let cancel: any = undefined;

interface recommendationsResponse {
  id: number;
	title: string;
	name: string; // title for TV shows
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
  vote_count: number;
  vote_average: number;
  genre_ids: number[];
  // adult: boolean;
}

const RecommendationsResults: React.FC = () => {
  const {filter, } = useFilter();
	const [recommendations, setRecommendations] = useState<recommendationsResponse[]>([]);
  
  useEffect(() => {
		// Call function in the api to make request with the filter
		fetchRecommendations();
		
		//eslint-disable-next-line
	}, [filter]);

	function fetchRecommendations() {
		if (cancel!==undefined) {
			cancel();
    }
		const params = { 
			...filter, 
			"certification.lte": filter.certification_lte,
			certification_lte: null,
			option: null, 
		};
		
		tmdbAPI.get(`/discover/${filter.option}`, {
			cancelToken: new CancelToken(function executor(c) {
				cancel = c;
			}),
			params,
		})
			.then(res => {
        console.log(res.data.results);
        setRecommendations(res.data.results);
			})
			.catch(err => {return;});
	}
  
  const stopClickPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  }

  return (
    <div className="results">
      <span className="results-title">Resultados</span>
      <ul className="card-list">
        {recommendations.map(recommendation => (
          <li 
            className="card"
            key={recommendation.id}
            onClick={() => alert('Abrir detalhes')}
          >
            { recommendation.backdrop_path 
              && <img 
                  src={`${baseImgURL}w500${recommendation.backdrop_path}`} 
                  alt="background"
                  className="background-img"  
                />
            }
            {recommendation.poster_path 
              ? <img 
                  src={`${baseImgURL}w154${recommendation.poster_path}`} 
                  alt={recommendation.title}
                  className="poster-img"  
                />
              : <div className="poster-img" />
            }
            <div className="info">
              <h1>{recommendation.title || recommendation.name}</h1>
              <div className="overview" onClick={stopClickPropagation}>
                <p>
                  {recommendation.overview.slice(0, 160) || "Sem resumo"}
                  {recommendation.overview.length > 160 && <span className="dots">...</span> }
                </p> 
                {recommendation.overview.length > 160 
                  && 
                  <p className="dropdown-overview" >
                    {recommendation.overview}
                  </p>
              }
              </div>
              <div className="bottom">
                <EvaluationCircle vote_average={recommendation.vote_average} vote_count={recommendation.vote_count}/>
                <GenresTags genre_ids={recommendation.genre_ids}/>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ); 
}

export default RecommendationsResults;