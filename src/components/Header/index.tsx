import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './styles.scss';

interface HeaderProps {
  backButtonRoute: string;
  goBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ backButtonRoute, goBack=false }) => {
  const history = useHistory();

  function handleBackClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (goBack) {
      e.preventDefault();
      history.goBack();
      history.push(backButtonRoute);
    }
  }

  return (
    <header>
      <div className="logo">
        <img src={icon} alt="Ícone"/>
        <h1>Recomenda<span>Filmes</span></h1>
      </div>
      <Link to={backButtonRoute} onClick={e => handleBackClick(e)}>
        <MdArrowBack size={'6rem'} className="back"/>
      </Link>
    </header>	
  );
}

export default Header;