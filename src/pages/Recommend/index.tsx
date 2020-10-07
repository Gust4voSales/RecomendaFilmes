import React, { useEffect, useRef, useState } from 'react';
import icon from '../../assets/icon.png';
import { MdArrowBack, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch } from "react-icons/md";
import './styles.scss';
import { Link } from 'react-router-dom';
import Genre from '../../components/filters/Genre';
import { useFilter } from '../../contexts/filtersContexts';
import tmdbAPI from '../../services/api';
import People from '../../components/filters/People';
import Certification from '../../components/filters/Certification';
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

	const filtersBlockRef = useRef<HTMLDivElement>(null);
	const [selectedOptionResults, setSelectedOptionResults] = useState('movie');
	const [showFilters, setShowFilters] = useState(true);
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
		const params = { 
			...filter, 
			"certification.lte": filter.certification_lte,
			certification_lte: null,
			option: null, 
		};
		
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

	function handleToggleShowFilter() {
		// If showFilters = true, then the user is trying to close it, so we should set a timer to do that meanwhile adding 
		// the remove animation
		if (showFilters) {
			setTimeout(() => {
				setShowFilters(!showFilters);
			}, 250);

			filtersBlockRef.current?.classList.add('remove-filters-block');
		} else {
			setShowFilters(!showFilters);
			filtersBlockRef.current?.classList.remove('remove-filters-block');
		}
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
						<div className="filters-block-header">
							<div onClick={handleToggleShowFilter}>
								Filtros 
								{ showFilters ? <MdKeyboardArrowUp className="arrow" /> : <MdKeyboardArrowDown className="arrow" /> }
							</div>
							<div className="clear-filters-btn">Limpar todos os filtros</div>
						</div>

						{ showFilters 
							? <div className="filters-block" ref={filtersBlockRef}>
								<Genre />
								<People />
								<Certification />
								<Year />
							</div>
							: <div style={{ width: '99%', height: '.2rem', backgroundColor: 'white', alignSelf: 'center' }}/>
						}
					</div>
				</section>
				
				<section className="results"></section>
		</div>
	);
}


export default Recommend;