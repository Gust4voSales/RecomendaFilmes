import React from 'react';
import icon from '../../assets/icon.png';
import './styles.scss';
import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <div id="landing">
            <header className="header">
                <img src={icon} alt="Ícone"/>
                <h1>Recomenda<span>Filmes</span></h1>
            </header>

            <div className="content">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Laboriosam maiores necessitatibus fugiat vero ab commodi, 
                </p>

                <div className="buttonsContainer">
                    <Link to="/recomendar" className="primaryButton">Me recomende algo</Link>
                 
                    <Link to="/">Ver categorias</Link>
                </div>
            </div>
        </div>
    );
}

export default Landing;