import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFilter } from '../../contexts/filtersContexts';
import tmdbAPI from '../../services/api';
import CardResult from '../CardResult';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';
import LoadMoreButton from '../LoadMoreButton';
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
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
		// Call function in the api to make request with the filter
		setPage(1);
		fetchRecommendations();
		
		//eslint-disable-next-line
	}, [filter]);

	function fetchRecommendations(page=1) {
		if (cancel!==undefined) {
			cancel();
    }
		const params = { 
			...filter, 
			"certification.lte": filter.certification_lte,
			certification_lte: null,
			option: null, 
			page,
		};
		
		setLoadingResults(true);
		setError(false);

		tmdbAPI.get(`/discover/${filter.option}`, {
			cancelToken: new CancelToken(function executor(c) {
				cancel = c;
			}),
			params,
		})
			.then(res => {
        console.log(res.data);
				if (page===1)
					setRecommendations(res.data.results);
				else 
					setRecommendations([...recommendations, ...res.data.results]);
				setTotalPages(res.data.total_pages);
				setLoadingResults(false);
			})
			.catch(err => {
				setLoadingResults(false);
				setError(true);
				return;
			});
	}

	function handleLoadMore() {
		if (page<totalPages) {
			fetchRecommendations(page+1);		
			if (error)
				setPage(1);
			else 
				setPage(page+1);
		}
	}

  return (
    <div className="results">
      <span className="results-title">Resultados</span>
      <ul className="card-list">
        {recommendations.map(recommendation => (
          <CardResult data={recommendation} key={recommendation.id}/>
        ))}
      </ul>
			<div className="footer">
				{
					// If there are no results and errors and it's not loading then show this message 
					recommendations.length===0 && !loadingResults && !error 
						? <span>Nenhum resultado encontrado. Tente alterar alguns filtros</span> 
						: null
				}
				{
					// If it's loading, show Loader
					loadingResults ? <Loading /> : null
				}
				{
					// If there are results, no errors and it's not loading then show LoadMoreButton
					!loadingResults && !error && recommendations.length>0 && page<totalPages
						? <LoadMoreButton onClick={handleLoadMore} /> 
						: null
				}
				{
					// If it's not loading and there is an error then show Error message
					error && !loadingResults 
						? <ErrorMessage message={`😕 Erro ao buscar ${filter.option==='movie' ? 'filmes' : 'séries'}`}/> 
						: null
				}
			</div>
    </div>
  ); 
}

export default RecommendationsResults;