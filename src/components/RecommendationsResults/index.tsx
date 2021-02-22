import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFilter } from '../../contexts/filtersContexts';
import tmdbAPI from '../../services/api';
import CardResult from '../CardResult';
import Loading from '../Loading';
import './styles.scss';

const CancelToken = Axios.CancelToken;
let cancel: any = undefined;

export interface recommendationsResponse {
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
  const {filter, loadingResults, setLoadingResults } = useFilter();
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
		
		setLoadingResults(true);
		setRecommendations([]);

		tmdbAPI.get(`/discover/${filter.option}`, {
			cancelToken: new CancelToken(function executor(c) {
				cancel = c;
			}),
			params,
		})
			.then(res => {
        // console.log(res.data.results);
				setRecommendations(res.data.results);
				setLoadingResults(false);
			})
			.catch(err => {
				setLoadingResults(false);
				return;
			});
	}

  return (
    <div className="results">
      <span className="results-title">Resultados</span>
      <ul className="card-list">
        {recommendations.map(recommendation => (
          <CardResult data={recommendation} key={recommendation.id}/>
        ))}
      </ul>
			{
				loadingResults ? <Loading /> : null
			}
    </div>
  ); 
}

export default RecommendationsResults;