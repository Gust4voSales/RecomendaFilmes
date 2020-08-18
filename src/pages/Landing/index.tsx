import React from 'react';
import icon from '../../assets/icon.png';
import './styles.scss';

const Landing = () => {
    return(
        <div id="landing">
            <div className="header">
                <img src={icon} alt="Ícone"/>
                <h1>Recomenda<span>Filmes</span></h1>
            </div>

            <div className="content">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Laboriosam maiores necessitatibus fugiat vero ab commodi, 
                </p>

                <div className="buttonsContainer">
                    <a href="#">Me recomende algo</a>
                 
                    <a href="#">Ver categorias</a>
                </div>
            </div>
        </div>
    );
}

export default Landing;