import React, { useState } from 'react';
import icon from '../../assets/icon.png';
import { MdArrowBack, MdSearch } from "react-icons/md";
import './styles.scss';
import { Link } from 'react-router-dom';
import Genre from '../../components/filters/Genre';

const Recommend = () => {
	const [selectedOptionResults, setSelectedOptionResults] = useState('movies');

	function handleOptionResultsSelection(option: string) {
		setSelectedOptionResults(option)
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

			<div className="description-container">
				<div className="top">
					<span>Pesquise por um{selectedOptionResults==='movies' ? ' filme' : 'a série'}</span>
					<div className="radio-container">
						<button 
							style={
									selectedOptionResults==='movies' 
									? { backgroundColor: '#575757' } 
									: {backgroundColor: 'transparent' } 
							}
							onClick={() => handleOptionResultsSelection('movies')}
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
						placeholder={"Nome d"+(selectedOptionResults==='movies'? 'o filme' : 'a série')}
					/>
				</div>
				<span>Ou utilize quantos filtros quiser e com certeza irá encontrar algo que lhe agrade</span>
			</div>

			<div className="filters-container">
				<div className="filters-block">
					<Genre />
					<Genre />
					<Genre />
				</div>
			</div>	
		</div>
	);
}


export default Recommend;