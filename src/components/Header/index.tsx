import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { Link, } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './styles.scss';

interface HeaderProps {
  backButtonRoute: string;
}

const Header: React.FC<HeaderProps> = ({ backButtonRoute }) => {
  return (
    <header>
      <div className="logo">
        <img src={icon} alt="Ícone"/>
        <h1>Recomenda<span>Filmes</span></h1>
      </div>
      <Link to={backButtonRoute} >
        <MdArrowBack size={'6rem'} className="back"/>
      </Link>
    </header>	
  );
}

export default Header;