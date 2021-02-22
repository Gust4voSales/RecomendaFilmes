import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFilter } from '../../contexts/filtersContexts';
import tmdbAPI from '../../services/api';
import CardResult from '../CardResult';
import ErrorMessage from '../ErrorMessage';
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
	const [error, setError] = useState(false);
  
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
		setError(false);

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
				setRecommendations([]);
				setError(true);
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
				recommendations.length===0 && !loadingResults ? <span>Nenhum resultado encontrado. Tente alterar alguns filtros</span> : null
			}
			{
				loadingResults ? <Loading /> : null
			}
			{
				error && !loadingResults ? <ErrorMessage message={`😕 Erro ao buscar ${filter.option==='movie' ? 'filmes' : 'séries'}`}/> : null
			}
    </div>
  ); 
}

export default RecommendationsResults;