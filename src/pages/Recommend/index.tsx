import React from 'react';
import icon from '../../assets/icon.png';
import { MdArrowBack, MdSearch } from "react-icons/md";
import './styles.scss';
import { Link } from 'react-router-dom';

const Recommend = () => {
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
                <span>Pesquise por um filme</span>
                <div className="input">
                    <MdSearch size={'4rem'} className="search-icon"/>
                    <input type="search" name="search" id="search" placeholder="Nome do filme"/>
                </div>
                <span>Ou utilize quantos filtros quiser e com certeza irá encontrar algo que lhe agrade</span>
            </div>

            <div className="filters-container">

            </div>
        </div>
    );
}


export default Recommend;