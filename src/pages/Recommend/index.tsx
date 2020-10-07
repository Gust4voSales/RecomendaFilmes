import React, { useEffect, useState } from 'react';
import icon from '../../assets/icon.png';
import { MdArrowBack, MdSearch } from "react-icons/md";
import './styles.scss';
import { Link } from 'react-router-dom';
import Genre from '../../components/filters/Genre';
import { useFilter } from '../../contexts/filtersContexts';
import tmdbAPI from '../../services/api';
import People from '../../components/filters/People';
import axios from 'axios';
import Year from '../../components/filters/Year';

const CancelToken = axios.CancelToken;
let cancel: any = undefined;


interface recommendationsResponse {
	poster_path: string | null;
	// adult: boolean;
	overview: string;
	id: number;
	title: string;
}

const Recommend = () => {
	const { filter, changeFilter } = useFilter();

	const [selectedOptionResults, setSelectedOptionResults] = useState('movie');
	// const [recommendations, setRecommendations] = useState<recommendationsResponse[]>([]);

	useEffect(() => {
		// Call function in the api to make request with the filter
		fetchRecommendations();
		
		//eslint-disable-next-line
	}, [filter]);

	function fetchRecommendations() {
		if (cancel!==undefined) {
			cancel();
    }
		const params = { ...filter, option: null };
		
		tmdbAPI.get(`/discover/${selectedOptionResults}`, {
			cancelToken: new CancelToken(function executor(c) {
				cancel = c;
			}),
			params,
		})
			.then(res => {
				console.log(res.data.results[0]);
			})
			.catch(err => {return;});

	}

	function handleOptionResultsSelection(option: string) {
		setSelectedOptionResults(option);
		// console.log();
		changeFilter({ ...filter, option });
	}

	return(
		<div id="recommend">   
			<header>
				<div className="logo">
					<img src={icon} alt="Ícone"/>
					<h1>Recomenda<span>Filmes</span></h1>
				</div>
				<Link to="/">
					<MdArrowBack size={'6rem'} className="back"/>
				</Link>
			</header>			
				
				<section className="filters">
					<div className="description-container">
						<div className="top">
							<span>Pesquise por um{selectedOptionResults==='movie' ? ' filme' : 'a série'}</span>
							<div className="radio-container">
								<button 
									style={
											selectedOptionResults==='movie' 
											? { backgroundColor: '#575757' } 
											: {backgroundColor: 'transparent' } 
									}
									onClick={() => handleOptionResultsSelection('movie')}
								>
									Filmes
								</button>
								<button
									style={
											selectedOptionResults==='tv' 
											? { backgroundColor: '#575757' } 
											: { backgroundColor: 'transparent' } 
									}
									onClick={() => handleOptionResultsSelection('tv')}
								>
									Séries
								</button>
							</div>
						</div>
						<div className="input">
							<MdSearch size={'4rem'} className="search-icon"/>
							<input 
								type="search" 
								name="search" 
								id="search" 
								placeholder={"Nome d"+(selectedOptionResults==='movie'? 'o filme' : 'a série')}
							/>
						</div>
						<span>Ou utilize quantos filtros quiser e com certeza irá encontrar algo que lhe agrade</span>
					</div>
				
					<div className="filters-container">
						<div className="filters-block">
							<Genre />
							<People />
							<Year />
						</div>
					</div>
				</section>
				
				<section className="results"></section>
		</div>
	);
}


export default Recommend;