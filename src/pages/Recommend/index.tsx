import React, { useRef, useState } from 'react';
import icon from '../../assets/icon.png';
import { MdArrowBack, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch } from "react-icons/md";
import './styles.scss';
import { Link } from 'react-router-dom';
import Genre from '../../components/filters/Genre';
import { filterInitialState, useFilter } from '../../contexts/filtersContexts';
import People from '../../components/filters/People';
import Certification from '../../components/filters/Certification';
import Year from '../../components/filters/Year';
import RecommendationsResults from '../../components/RecommendationsResults';


const Recommend = () => {
	const { filter, changeFilter } = useFilter();

	const filtersBlockRef = useRef<HTMLDivElement>(null);
	const [selectedOptionResults, setSelectedOptionResults] = useState('movie');
	const [showFilters, setShowFilters] = useState(true);
	const [refresherState, setRefresherState] = useState(0);

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

	function handleClearFilters() {
		setRefresherState(refresherState+1);
		setTimeout(() => {
			changeFilter(filterInitialState);
		}, 600);
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
							<div onClick={handleToggleShowFilter} title="Minimizar filtros">
								Filtros 
								{ showFilters ? <MdKeyboardArrowUp className="arrow" /> : <MdKeyboardArrowDown className="arrow" /> }
							</div>
							<div onClick={handleClearFilters} className="clear-filters-btn">Limpar todos os filtros</div>
						</div>

						<div
						  className="filters-block"
							style={showFilters ? {} : { display: 'none' }}
							ref={filtersBlockRef}
						>
						
							<Genre shouldReload={refresherState}/>
							{
								selectedOptionResults==='tv'
									? (<>
											<People shouldReload={refresherState} style={{ display: 'none' }}/>
											<Certification shouldReload={refresherState} style={{ display: 'none' }}/> 
										</>)
									: (<>
											<People shouldReload={refresherState}/>
											<Certification shouldReload={refresherState}/> 
										</>)
							}
							<Year shouldReload={refresherState}/>
						</div>
						{ showFilters 
							? null
							: <div style={{ width: '99%', height: '.2rem', backgroundColor: 'white', alignSelf: 'center' }}/>
						}
					</div>
				</section>
				
				<section className="results">
					<RecommendationsResults />
				</section>
		</div>
	);
}


export default Recommend;