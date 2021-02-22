import React, { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, } from "react-icons/md";
import './styles.scss';
import Genre from '../../components/filters/Genre';
import { filterInitialState, useFilter } from '../../contexts/filtersContexts';
import People from '../../components/filters/People';
import Certification from '../../components/filters/Certification';
import Year from '../../components/filters/Year';
import RecommendationsResults from '../../components/RecommendationsResults';
import Header from '../../components/Header';
import { useInView } from 'react-intersection-observer';
import ResultsIndicator from '../../components/ResultsIndicator';
import { useHistory, useLocation } from 'react-router-dom';
import '../../components/SearchInput.scss';

interface LocationState {
	returningFromSearch: boolean | undefined;
}

const Recommend = () => {
	const history = useHistory();
	const location = useLocation();

	const { filter, changeFilter } = useFilter();
	const [inViewRef, inView, ] = useInView({
    threshold: 0.02,
  });
	
	const fakeInputRef = useRef<HTMLInputElement>(null);

	const filtersBlockRef = useRef<HTMLDivElement>(null);
	const resultsRef = useRef<HTMLDivElement>(null);

	const [selectedOptionResults, setSelectedOptionResults] = useState(filter.option);
	const [showFilters, setShowFilters] = useState(true);
	const [refresherState, setRefresherState] = useState(false);

	useEffect(() => {
		if (location.state) {
			const { returningFromSearch } = location.state as LocationState
			
			if (returningFromSearch === true) {
				fakeInputRef?.current?.focus();
			}
		}
		
	}, [location]);

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
		setRefresherState(true);
		setTimeout(() => {
			changeFilter({...filterInitialState, option: filter.option});
			setRefresherState(false);
		}, 600);
	}

	function handleScrollToResults() {
		resultsRef.current?.scrollIntoView();
	}

	return(
		<div id="recommend">   
				<Header backButtonRoute="/"/>

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
						
						<div className="search-input">
							<MdSearch size={'4rem'} className="search-icon"/>
							<input 
								name="fake-search" 
								id="fake-search" 
								type="search"
								ref={fakeInputRef}
								autoComplete="off"
								onChange={e => history.push(`/pesquisar?q=${e.target.value}`)}
								placeholder={"Nome d"+(filter.option==='movie'? 'o filme' : 'a série')}
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
				
				<section className="results" ref={inViewRef}>
					<div ref={resultsRef} />
					<RecommendationsResults />
				</section>

				<ResultsIndicator showIndicator={!inView} onScrollToResultsClick={handleScrollToResults}/>
		</div>
	);
}


export default Recommend;