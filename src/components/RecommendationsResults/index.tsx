import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFilter } from '../../contexts/filtersContexts';
import tmdbAPI, { baseImgURL } from '../../services/api';
import './styles.scss';

const CancelToken = Axios.CancelToken;
let cancel: any = undefined;

interface recommendationsResponse {
  id: number;
	title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
  vote_count: number;
  vote_average: number;
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
        // console.log(res.data.results[0]);
        setRecommendations(res.data.results);
			})
			.catch(err => {return;});
	}
  
  
  return (
    <div className="results">
      Resultados
      <ul>
        {
          recommendations.map(recommendation => (
            <li 
              key={recommendation.id}
            >
              { recommendation.backdrop_path 
                && <img 
                    src={`${baseImgURL}w500${recommendation.backdrop_path}`} 
                    alt="background"
                    className="background-img"  
                  />
              }

              { recommendation.poster_path 
                ? <img 
                    src={`${baseImgURL}w154${recommendation.poster_path}`} 
                    alt={recommendation.title}
                    className="poster-img"  
                  />
                : <div className="poster-img" />
              }
              <div className="info">
                <h1>{recommendation.title}</h1>

              </div>
            </li>
          ))
        }
      </ul>
    </div>
  ); 
}

export default RecommendationsResults;