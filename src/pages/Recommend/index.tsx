import React from 'react';
import icon from '../../assets/icon.png';
import { MdArrowBack } from "react-icons/md";
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
        </div>
    );
}


export default Recommend;